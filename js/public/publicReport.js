var svcHeader = "http://112.81.63.243/ZZWaterDB/sharedService/";
// http://112.81.63.243/ZZWaterDB/sharedService/Ashx_System.ashx?method=uploadFile&token=b9813978d9674a60aeb2d8078fc52f28&file=
var svc_own = svcHeader;
var imageArr=[];
var lat11=0;
var lon11=0;
var bool=true;
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, state.title, state.url);
}
function photoViewer(url) {
    var url1=imageHeader+url;
    console.log(url);
    if (typeof window.WeixinJSBridge != 'undefined') { //微信图片集查看 WeixinJS
        WeixinJSBridge.invoke('imagePreview', {

            'current': url, //当前地址

            'urls':[url] //组

        });
    }
    else
    {
        // alert("请在微信中查看");
    }
}
function imgChange(obj1, obj2) {
    //获取点击的文本框
    var file = document.getElementById("file");
    //存放图片的父级元素
    var imgContainer = document.getElementsByClassName(obj1)[0];
    //获取的图片文件
    var fileList = file.files;
    console.log(fileList);
    //文本框的父级元素
    var input = document.getElementsByClassName(obj2)[0];
    var imgArr = [];
    console.log(imgArr);
    //遍历获取到得图片文件
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(file.files[i]);


        // var file = this.files[0];
        var formdata = new FormData();

        // var imgUrl = window.URL.createObjectURL(file);

        var img = new Image();
        img.src = imgUrl;        // 传过来的图片路径在这里用。
        img.onload = function () {
            var that = this;
            //生成比例
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = 1000 || w;              //480  你想压缩到多大，改这里
            h = w / scale;

            //生成canvas
            var canvas = document.createElement('canvas');

            var ctx = canvas.getContext('2d');

            $(canvas).attr({width: w, height: h});
            ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏
            ctx.drawImage(that, 0, 0, w, h);

            var base64 = canvas.toDataURL('image/jpg', 1 || 0.8);   //1最清晰，越低越模糊。有一点不清楚这里明明设置的是jpeg。弹出 base64 开头的一段 data：image/png;却是png。哎开心就好，开心就好
            // f1 =base64;   // 把base64数据丢过去，上传要用。
            var blob = dataURItoBlob(base64); // 上一步中的函数
            var dataURL = canvas.toDataURL('image/jpg', 0.5);
            var fd = new FormData(document.forms[0]);
            formdata.append("file", blob, 'image.jpg');
            imgArr.push(imgUrl);
            var img = document.createElement("img");
            img.setAttribute("src", base64);
            var imgurl1=base64;
            // img.addEventListener("click", function() {
            //     // console.log(base64);
            //     photoViewer(base64);
            // })
            var imgAdd = document.createElement("div");
            imgAdd.setAttribute("class", "z_addImg");
            imgAdd.appendChild(img);
            // imgContainer.appendChild(imgAdd);
            var addDiv = document.getElementsByClassName('z_file')[0];
            imgContainer.insertBefore(imgAdd,addDiv)
            // formdata.append('file', file)
            $.ajax({
                url: svc_own + "Ashx_System.ashx?method=uploadFile",
                type: 'POST',
                dataType:"json",
                data: formdata,
                contentType: false,
                processData: false,
                success: function (args) {
                    console.log(args)
                    if (args.isOK==1)
                    {
                        imageArr.push(args.rows[0].imgUrl);
                        console.log(imageArr);
                        var imageUrl=imageHeader+args.rows[0].imgUrl;

                        img.addEventListener("click", function() {
                            console.log(imageUrl);
                            photoViewer(imageUrl);
                        })


                    }
                    else
                    {

                        bool=false;
                        setTimeout(function(){
                            $("#myPopup1").popup("close");
                            bool=true;
                        },1500);
                        ;
                        $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
                        $("#myPopup1").popup('open');
                    }

                }
            });


        }


        // uploadImage(file.files[i]);



    };


    imgRemove();
};
function dataURItoBlob(base64Data) {
    var byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);
    else
        byteString = unescape(base64Data.split(',')[1]);
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}
function imgRemove() {
    var imgList = document.getElementsByClassName("z_addImg");

    var mask = document.getElementsByClassName("z_mask")[0];
    var cancel = document.getElementsByClassName("z_cancel")[0];
    var sure = document.getElementsByClassName("z_sure")[0];
    for (var j = 0; j < imgList.length; j++) {
        imgList[j].index = j;
        imgList[j].onclick = function() {
            var t = this;
            mask.style.display = "block";
            cancel.onclick = function() {
                mask.style.display = "none";
            };
            sure.onclick = function() {
                mask.style.display = "none";
                t.style.display = "none";
            };

        }
    };
};
function DegreeConvertBack(du,fen,miao)
{ ///<summary>度分秒转换成为度</summary>
    // var du = du;
    // var fen = value.split("°")[1].split("'")[0];
    // var miao = value.split("°")[1].split("'")[1].split('"')[0];
    var a=Math.abs(du)+(Math.abs(fen)/60+Math.abs(miao)/3600);
    // return Math.abs(du) + "." + (Math.abs(fen)/60 + Math.abs(miao)/3600);
    return a;


}
function uploadImage(file) {
    var formdata = new FormData();
    // //


    var lat1=0;
    var lon1=0;
    if (file && file.name) {
        EXIF.getData(file, function() {
            var exifData = EXIF.getTag(this,'GPSLatitude');
            if (exifData) {
                var du=exifData[0]['numerator']/exifData[0]['denominator'];
                var fen=exifData[1]['numerator']/exifData[1]['denominator'];
                var miao=exifData[2]['numerator']/exifData[2]['denominator'];
                lat11=DegreeConvertBack(du,fen,miao);
                console.log(lat1);
            } else {
                console.log("No EXIF data found in image '" + file.name + "'.");
            }
            var exifData2 = EXIF.getTag(this,'GPSLongitude');
            if (exifData2) {
                var du2=exifData2[0]['numerator']/exifData[0]['denominator'];
                var fen2=exifData2[1]['numerator']/exifData[1]['denominator'];
                var miao2=exifData2[2]['numerator']/exifData[2]['denominator'];
                lon11=DegreeConvertBack(du2,fen2,miao2);
                console.log(lon1);
            }
        });
    }

    formdata.append('file', file);
    $.ajax({
        url: svc_own + "Ashx_System.ashx?method=uploadFile",
        type: 'POST',
        dataType:"json",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (args) {

            if (args.isOK == 1) {
                // console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
                imageArr.push(args.rows[0].imgUrl);
                console.log(imageArr);
            }
            else {
                bool=false;
                setTimeout(function(){
                    $("#myPopup1").popup("close");
                    bool=true;
                },1500);
                $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
                $("#myPopup1").popup('open');
            }

        }
    })
}
$(function () {
    pushHistory();
    bool=true;
    window.addEventListener("popstate", function(e) {
        if(bool)
        {
            location.href='HomePublic.html';  //在这里指定其返回的地址
        }
        pushHistory();

    }, false);
    var i = 0;
    if (i == 0) {
        // 初始化插件
        $("#zyupload").zyUpload({
            fileInput: null,
            uploadInput: null,
            width: "100%",                 // 宽度
            height: "100%",                 // 宽度
            itemWidth: "64px",                 // 文件项的宽度
            itemHeight: "64px",                 // 文件项的高度
            // url: "/WEI/Data/AddRepair.ashx?location=" + $("#xiaoqu").val() + "&userID=" + "1" + "&repairContent=" + $("#repair_content").val(),  // 上传文件的路径
            fileType: ["jpg", "JPG", "png", "gif", "jpeg"],// 上传文件的类型
            fileSize: 5120000 ,                // 上传文件的大小
            multiple: true,                    // 是否可以多个文件上传
            fileNum: 3,
            dragDrop: false,                   // 是否可以拖动上传文件
            tailor: true,                   // 是否可以裁剪图片
            del: true,                    // 是否可以删除文件
            finishDel: false,  				  // 是否在上传文件完成后删除预览
            /* 外部获得的回调接口 */
            onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                // console.info("当前选择了以下文件：");
                // console.info(selectFiles);
                // console.log($("#photoContent").val());

                for (var i=0;i<selectFiles.length;i++)
                {
                    var formdata = new FormData();
                    formdata.append('file', selectFiles[i]);
                    $.ajax({
                        url: svc_own + "Ashx_System.ashx?method=uploadFile",
                        type: 'POST',
                        dataType:"json",
                        data: formdata,
                        contentType: false,
                        processData: false,
                        success: function (args) {

                            if (args.isOK==1)
                            {
                                console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
                                imageArr.push(args.rows[0].imgUrl);
                                console.log(imageArr);
                            }
                            else
                            {

                                bool=false;
                                setTimeout(function(){
                                    $("#myPopup1").popup("close");
                                    bool=true;
                                },2500);
                                $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
                                $("#myPopup1").popup('open');
                            }

                        }
                    });
                }

                console.log(formdata);
                // $.ajax({
                //     type: "post",
                //     url: svc_own + "Ashx_System.ashx?method=uploadFile",
                //     dataType: 'jsonp',
                //     // crossDomain: true,
                //     // jsonp: 'callback',
                //     data: formdata,
                //     contentType: false, //必须
                //     processData: false,
                //     //不能用success，否则不执行
                //     complete: function (data) {
                //         var result=data.responseJSON;
                //         console.log(data.responseJSON);
                //         // var data = eval(data.responseText);
                //         console.log(result.rows);
                //     },
                //
                //     error: function (XMLHttpRequest, textStatus, errorThrown) {
                //         alert("失败！");
                //     }
                // });
                // $.ajax({
                //     url: svc_own + "Ashx_System.ashx?method=uploadFile&token=b9813978d9674a60aeb2d8078fc52f28",
                //     type: 'POST',
                //     data: formdata,
                //     contentType: false,
                //     processData: false,
                //     success: function (args) {
                //         console.log(args);  /*服务器端的图片地址*/
                //         // $("#avatarPreview").attr('src','/'+args);  /*预览图片*/
                //         // $("#avatar").val('/'+args);  /*将服务端的图片url赋值给form表单的隐藏input标签*/
                //     }
                // });
                // $.ajax({
                //     type: "post",
                //     url: svc_own + "Ashx_System.ashx?method=uploadFile",
                //     dataType: 'jsonp',
                //     data: formdata,
                //     contentType: false, //必须
                //     //不能用success，否则不执行
                //     success:function(response){
                //         console.log("请求成功！");
                //         console.log(response);
                //     },
                //     complete: function (data) {
                //         var result=data.responseJSON;
                //         console.log(data.responseJSON);
                //         // var data = eval(data.responseText);
                //         console.log(result.rows);
                //     },
                //
                //     error: function (XMLHttpRequest, textStatus, errorThrown) {
                //         alert("失败！");
                //     }
                // });
                // $.ajax({
                //     url: svc_own + "Ashx_System.ashx?method=uploadFile",
                //     dataType: 'jsonp',
                //     type:'POST',	// 请求方式
                //     data:formdata,	// 请求数据
                //     //data:'{"userId":"value"}',	// .NET服务较为严格，需要使用这种格式
                //     dataType:"json",
                //     contentType: "application/json",
                //     cache:false,
                //     // async:false,
                //     success:function(response){
                //         console.log("请求成功！");
                //         console.log(response);
                //     },
                //     error : function(XMLHttpRequest, textStatus, errorThrown) {
                //         // view("异常！");
                //         console.log("接口请求失败！");
                //     }
                // });
                // $.ajax({
                //     type: "post",
                //     url: svc_own + "Ashx_System.ashx?method=uploadFile&token=b9813978d9674a60aeb2d8078fc52f28",
                //     dataType: 'json',
                //     data: formdata,
                //     //不能用success，否则不执行
                //     complete: function (data) {
                //         var result=data.responseJSON;
                //         console.log(data.responseJSON);
                //         // var data = eval(data.responseText);
                //         console.log(result.rows);
                //     },
                //
                //     error: function (XMLHttpRequest, textStatus, errorThrown) {
                //         alert("失败！");
                //     }
                // });

//                 var formdata=new FormData(selectFiles[0]);//获取文件法一
//                 console.log(formdata);
// //var formdata=new FormData( );
// // formdata.append("file" , $("#file")[0].files[0]);//获取文件法二
//                 $.ajax({
//                     type : 'post',
//                     url:'http://112.81.63.243/ZZWaterDB/sharedService/Ashx_System.ashx?method=uploadFile&token=b9813978d9674a60aeb2d8078fc52f28&file=',	// 接口地址
//                     data :formdata,
//                     cache : false,
//                     processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
//                     contentType : false, // 不设置Content-type请求头
//                     success : function(respones){
//                         console.log(response);
//                     },
//                     error : function(){
//
//                     }
//                 })
            },
            onDelete: function (file, files) {              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
                console.info("当前删除了此文件：");
                console.info(file.name);
            },
            onSuccess: function (file, response) {          // 文件上传成功的回调方法

                console.log(response);
                var json = eval("(" + response + ")");
                if (json.IsOk == "0") {
                    bool=false;
                    bool=false;
                    setTimeout(function(){
                        $("#myPopup1").popup("close");
                        bool=true;
                    },1500);
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">发布失败！</h2><p>" +'身份证号未登记！'+ "</p>")
                    $("#myPopup1").popup('open');
                } else {
                    bool=false;
                    setTimeout(function(){
                        bool=true;
                        window.location.href = "HomePublic.html";
                    },1500);
                    i++;
                    $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>你已经成功发布</p>")
                    $("#myPopup1").popup('open');
                    setTimeout(function () {
                        //window.location.reload();
                        // window.location.href = "RepairList.html";
                    }, 1500);
                }

            },
            onFailure: function (file, response) {          // 文件上传失败的回调方法
                console.info("此文件上传失败：");
                console.info(file.name);
            },
            onComplete: function (response) {           	  // 上传完成的回调方法
                console.info("文件上传完成");
                console.info(response);
            }
        });

    }

    $("#fileSubmit").click(function(event) {
        var images="";

        var kk=imageArr.length;
        if (kk==0)
        {
            alert("请上传照片");
        }
        else
        {
            if (lat11 == 0) {
                bool=false;
                setTimeout(function(){
                    bool=true;
                },1500);
                console.log("1111");
                $("#myPopup1").html("<a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><p>正在获取您的当前位置，请稍等。</p>")
                $("#myPopup1").popup('open');
                // 百度地图API功能
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398, 39.897445);
                // map.centerAndZoom(point,12);

                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {


                        var temp = bd09togcj02(r.point.lng, r.point.lat);
                        var newloc = gcj02towgs84(temp[0], temp[1]);

//            30.9124371686,120.5094498200
                        lon = newloc[0];
                        lat = newloc[1];
                        // alert(lon+","+lat);

                        uploadData();

                    }
                    else {
                        alert('failed' + this.getStatus());
                    }
                }, {enableHighAccuracy: true})

            }
            else {
                console.log("2222");
                lon = lon11;
                lat = lat11;
                // alert(lon+","+lat);

                uploadData();


            }
        }
        console.log(lat11);

    })
    $("#deailer").click(function () {

        $("#detaildiv").append('<label for="reportUserName">'+"姓名（"+'<span style="color:red;">'+"*必填"+'</span>'+"）"+'</label>'
            +'<input style="height:30px;" placeholder="姓名" id="reportUserName">'+'<label for="phone">'+"手机号码（"+'<span style="color:red;">'+"*必填"+'</span>'+"）"+'</label>'
            +'<input style="height:30px;" placeholder="手机号码" id="phone">'+'<label for="cardId">'+"身份证号码（"+'<span style="color:red;">'+"*必填"+'</span>'+"）"+'</label>'
            +'<input style="height:30px;" placeholder="身份证号码" id="cardId">').trigger('create');
        $("#deailer").unbind("click")
        $("#deailer").click(function(event) {
            var name1=$("#reportUserName").val();
            var phone1=$("#phone").val();
            var cardid1=$("#cardId").val();
            var images="";

            var kk=imageArr.length;
            if (kk==0)
            {
                alert("请上传照片");
            }
            else if( name1.length<2)
            {
                alert("请填写真实姓名");
            }
            else  if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone1)))
            {
                alert("请填写正确的手机号码");
            }
            else if(!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(cardid1))
            {
                alert("请填写正确的身份证")
            }
            else
            {

                if (lat11 == 0) {
                    bool=false;
                    setTimeout(function(){
                        bool=true;
                    },1500);
                    console.log("1111");
                    $("#myPopup1").html("<a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><p>正在获取您的当前位置，请稍等。</p>")
                    $("#myPopup1").popup('open');
                    // 百度地图API功能
                    var map = new BMap.Map("allmap");
                    var point = new BMap.Point(116.331398, 39.897445);
                    // map.centerAndZoom(point,12);

                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function (r) {
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {


                            var temp = bd09togcj02(r.point.lng, r.point.lat);
                            var newloc = gcj02towgs84(temp[0], temp[1]);

//            30.9124371686,120.5094498200
                            lon = newloc[0];
                            lat = newloc[1];
                            // alert(lon+","+lat);

                            uploadData2();

                        }
                        else {
                            alert('failed' + this.getStatus());
                        }
                    }, {enableHighAccuracy: true})

                }
                else {
                    console.log("2222");
                    lon = lon11;
                    lat = lat11;
                    // alert(lon+","+lat);

                    uploadData2();


                }
            }


        })
    })

});
function uploadData2() {
    var images="";

    var kk=imageArr.length;
    console.log("kk"+kk);

        for (var j=0;j<kk;j++)
        {
            console.log("nn"+j);
            if (images=="")
            {

                images=imageArr[j];
            }
            else
            {
                // console.log("sss"+imageArr[j]);
                images=images+","+imageArr[j];
                // console.log("sss=="+images);
            }


        }
        var  token=$.cookie('zzwxToken');

        var  userName=$.cookie('zzwxUserName');
        $("#myPopup").popup("close");
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx?method=reportQuestion&token="+"&riverCode="+"&riverName="+"&reportUserName="+$("#reportUserName").val()+"&qType=4&lon="+lon+"&lat="+lat+"&address="+ $("#adress").val()+"&phone="+ $("#phone").val()+"&cardId="+ $("#cardId").val()+"&reportUserName="+"&rType="+"&rTypeName="+"&emergency="+"&content="+ $("#question").val()+"&imgs="+images+"&videos=test&industryImg1=test&industryImg2=test&industryImg3=test&industryImg4=test&floater=test&ilegal=test&speed=test&guardrail=test&sewage=test&riverStatus=test&maintain=test",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: null,
            success: function (result) {
                console.log(result);
                if (result.isOK) {

                    bool=false;
                    setTimeout(function(){
                        $("#myPopup1").popup("close");
                        bool=true;
                    },1500);
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><p>提交成功</p>")
                    $("#myPopup1").popup('open');


                    console.log(result.rows);
                    setTimeout(function(){
                        $("#myPopup1").popup("close");
                        window.history.back();
                    },"3000");




                }
                else
                {
                    bool=false;
                    setTimeout(function(){
                        $("#myPopup1").popup("close");
                        bool=true;
                    },1500);
                    console.log("nono")
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                    $("#myPopup1").popup('open');

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("失败！");
            }
        });


}
function uploadData() {
    var images="";

    var kk=imageArr.length;
    if (kk==0)
    {
        alert("请上传照片");
    }
    else {
        console.log("kk"+kk);
        for (var j=0;j<kk;j++)
        {
            console.log("nn"+j);
            if (images=="")
            {

                images=imageArr[j];
            }
            else
            {
                // console.log("sss"+imageArr[j]);
                images=images+","+imageArr[j];
                // console.log("sss=="+images);
            }


        }
        var  token=$.cookie('zzwxToken');

        var  userName=$.cookie('zzwxUserName');
        $("#myPopup").popup("close");
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx?method=reportQuestion&token="+"&riverCode="+"&riverName="+"&reportUserName="+"&qType=3&lon="+lon+"&lat="+lat+"&address="+ $("#adress").val()+"&rType="+"&rTypeName="+"&emergency="+"&content="+ $("#question").val()+"&imgs="+images+"&videos=test&industryImg1=test&industryImg2=test&industryImg3=test&industryImg4=test&floater=test&ilegal=test&speed=test&guardrail=test&sewage=test&riverStatus=test&maintain=test",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: null,
            success: function (result) {
                console.log(result);
                if (result.isOK) {

                    bool=false;
                    setTimeout(function(){

                        bool=true;
                    },1500);
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><p>提交成功</p>")
                    $("#myPopup1").popup('open');


                    console.log(result.rows);


                    setTimeout(function(){
                        $("#myPopup1").popup("close");
                        // window.location.href="HomePublic.html";

                        window.history.back();
                    },"3000");


                }
                else
                {
                    bool=false;
                    setTimeout(function(){
                        $("#myPopup1").popup("close");
                        bool=true;
                    },1500);
                    console.log("nono")
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                    $("#myPopup1").popup('open');

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("失败！");
            }
        });
    }


}
function refresh1() {
    var i = 0;
    if (i == 0) {
        // 初始化插件
        $("#zyupload").zyUpload({
            fileInput: null,
            uploadInput: null,
            width: "100%",                 // 宽度
            height: "100%",                 // 宽度
            itemWidth: "64px",                 // 文件项的宽度
            itemHeight: "64px",                 // 文件项的高度
            // url: "/WEI/Data/AddRepair.ashx?location=" + $("#xiaoqu").val() + "&userID=" + "1" + "&repairContent=" + $("#repair_content").val(),  // 上传文件的路径
            fileType: ["jpg", "JPG", "png", "gif", "jpeg"],// 上传文件的类型
            fileSize: 5120000 ,                // 上传文件的大小
            multiple: true,                    // 是否可以多个文件上传
            fileNum: 4,
            dragDrop: false,                   // 是否可以拖动上传文件
            tailor: true,                   // 是否可以裁剪图片
            del: true,                    // 是否可以删除文件
            finishDel: false,  				  // 是否在上传文件完成后删除预览
            /* 外部获得的回调接口 */
            onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                console.info("111当前选择了以下文件：");
                console.info(selectFiles);
                console.log($("#photoContent").val());

            },
            onDelete: function (file, files) {              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
                console.info("当前删除了此文件：");
                console.info(file.name);
            },
            onSuccess: function (file, response) {          // 文件上传成功的回调方法

                console.log(response);
                var json = eval("(" + response + ")");
                if (json.IsOk == "0") {
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">发布失败！</h2><p>" +'上传失败！'+ "</p>")
                    $("#myPopup1").popup('open');
                } else {
                    i++;
                    $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>你已经成功发布</p>")
                    $("#myPopup1").popup('open');
                    setTimeout(function () {
                        //window.location.reload();
                        // window.location.href = "RepairList.html";
                    }, 1500);
                }

            },
            onFailure: function (file, response) {          // 文件上传失败的回调方法
                console.info("此文件上传失败：");
                console.info(file.name);
            },
            onComplete: function (response) {           	  // 上传完成的回调方法
                console.info("文件上传完成");
                console.info(response);
            }
        });

    }
}
// function uploadImage(file) {
//     var formdata = new FormData();
//     // //
//     var file = this.files[0];
//
//     var lat1=0;
//     var lon1=0;
//     if (file && file.name) {
//         EXIF.getData(file, function() {
//             var exifData = EXIF.getTag(this,'GPSLatitude');
//             if (exifData) {
//                 var du=exifData[0]['numerator']/exifData[0]['denominator'];
//                 var fen=exifData[1]['numerator']/exifData[1]['denominator'];
//                 var miao=exifData[2]['numerator']/exifData[2]['denominator'];
//                 lat1=DegreeConvertBack(du,fen,miao);
//                 console.log(lat1);
//             } else {
//                 console.log("No EXIF data found in image '" + file.name + "'.");
//             }
//             var exifData2 = EXIF.getTag(this,'GPSLongitude');
//             if (exifData2) {
//                 var du2=exifData2[0]['numerator']/exifData[0]['denominator'];
//                 var fen2=exifData2[1]['numerator']/exifData[1]['denominator'];
//                 var miao2=exifData2[2]['numerator']/exifData[2]['denominator'];
//                 lon1=DegreeConvertBack(du2,fen2,miao2);
//                 console.log(lon1);
//             }
//         });
//     }
//
//     formdata.append('file', file);
//     $.ajax({
//         url: svc_own + "Ashx_System.ashx?method=uploadFile",
//         type: 'POST',
//         dataType:"json",
//         data: formdata,
//         contentType: false,
//         processData: false,
//         success: function (args) {
//
//             if (args.isOK == 1) {
//                 // console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
//                 imageArr.push(args.rows[0].imgUrl);
//                 console.log(imageArr);
//             }
//             else {
//
//                 $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
//                 $("#myPopup1").popup('open');
//             }
//
//         }
//     })
// }