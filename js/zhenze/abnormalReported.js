var svcHeader = "http://112.81.63.243/ZZWaterDB/sharedService/";
// http://112.81.63.243/ZZWaterDB/sharedService/Ashx_System.ashx?method=uploadFile&token=b9813978d9674a60aeb2d8078fc52f28&file=
var imageHeader="http://112.81.63.243/ZZWaterDB/UploadFiles/mobile/";
var generatedCount=1;
var svc_own = svcHeader;
var imageArr=[];
var selectedtype=0;
var selectedtypeName="";
var emergency=0;

var riverId="";
var riverName="";
var jianyiArr=[];

var processType="";
var processTypeName="";
var processTypeArr=[];
var xaiquArr=[];
var villageCode="";
var villageName="";
var processTime="";
var processDateTime="";

var bool=false;
var showHistory=1;
// var holiday= ['2015-01-01','2015-01-02','2015-01-03','2015-01-08'];
// var holidayMap={};

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
                            bool=true;
                            console.log(bool)
                        },1500);
                        console.log(bool)
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

function imgRemove() {
    var imgList = document.getElementsByClassName("z_addImg");
    console.log(imgList);
    var mask = document.getElementsByClassName("z_mask")[0];
    var cancel = document.getElementsByClassName("z_cancel")[0];
    var sure = document.getElementsByClassName("z_sure")[0];
    for (var j = 0; j < imgList.length; j++) {
        // console.log(imgList);
        imgList[j].index = j;
        imgList[j].onclick = function() {
            var t = this;
            var res=t.src;
            // mask.style.display = "block";
            // cancel.onclick = function() {
            //     mask.style.display = "none";
            // };
            // sure.onclick = function() {
            //     mask.style.display = "none";
            //     t.style.display = "none";
            // };
            // console.log(t);
            // console.log(res);
        }
    };
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
function uploadImage(file) {

    var formdata = new FormData();

    var imgUrl = window.URL.createObjectURL(file);


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

        ctx.drawImage(that, 0, 0, w, h);

        var base64 = canvas.toDataURL('image/jpg', 1 || 0.8);   //1最清晰，越低越模糊。有一点不清楚这里明明设置的是jpeg。弹出 base64 开头的一段 data：image/png;却是png。哎开心就好，开心就好
        console.log(base64);

        f1 =base64;   // 把base64数据丢过去，上传要用。
        var blob = dataURItoBlob(base64); // 上一步中的函数
        var dataURL = canvas.toDataURL('image/jpg', 0.5);
        var fd = new FormData(document.forms[0]);
        formdata.append("file", blob, 'image.jpg');
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

                }
                else
                {

                    bool=false;
                    setTimeout(function(){
                        bool=true;
                    },1500);
                    $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
                    $("#myPopup1").popup('open');
                }

            }
        });
    }
    // var formdata = new FormData();
    // // //
    // // var file = this.files[0];
    // formdata.append('file', file);
    // $.ajax({
    //     url: svc_own + "Ashx_System.ashx?method=uploadFile",
    //     type: 'POST',
    //     dataType:"json",
    //     data: formdata,
    //     contentType: false,
    //     processData: false,
    //     success: function (args) {
    //
    //         if (args.isOK == 1) {
    //             // console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
    //             imageArr.push(args.rows[0].imgUrl);
    //             console.log(imageArr);
    //         }
    //         else {
    //
    //             $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
    //             $("#myPopup1").popup('open');
    //         }
    //
    //     }
    // })
}

function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, state.title, state.url);
}
$(function () {
    pushHistory();
    var bool=true;
    // setTimeout(function(){
    //     bool=true;
    // },1500);
    window.addEventListener("popstate", function(e) {
        console.log(showHistory);
        if (showHistory==1)
        {
            if(bool)
            {
                location.href='patrol.html';  //在这里指定其返回的地址
            }
            pushHistory();
        }
        else
        {
            pushHistory();
            hideImages();

        }
    }, false);

    var value = localStorage["rivv"];

    var Data= JSON.parse(value)
    // localStorage.removeItem("rivv");
    var lat11=Data.Latitude;
    var lon11=Data.Longitude;
    console.log(lat11+"--"+lon11);
    imageArr.push(Data.imageUrl);
    var imgContainer = document.getElementsByClassName('z_photo')[0];

    var imgUrl = Data.imageScr

    var img = document.createElement("img");
    img.setAttribute("src", imgUrl);
    // img.addEventListener("click", function() {
    //     photoViewer(imgUrl);
    // })
    var imageUrl=imageHeader+Data.imageUrl;

    img.addEventListener("click", function() {
        console.log(imageUrl);
        photoViewer(imageUrl);
    })
    var imgAdd = document.createElement("div");
    imgAdd.setAttribute("class", "z_addImg");
    imgAdd.appendChild(img);
    // imgContainer.appendChild(imgAdd);
    // console.log(imgAdd);
    // console.log(addDiv);
    var addDiv = document.getElementsByClassName('z_file')[0];
    imgContainer.insertBefore(imgAdd,addDiv)
    imgRemove();

    $("#fileSubmit").click(function(event) {
        if (riverName=="")
        {
            alert("请选择河湖");
        }
        else if (selectedtype==0)
        {
            alert("请选择上报类型");

        }
        else if ( emergency==0)
        {
            alert("请选择紧急情况");
        }
        else if ( processTypeName=="")
        {
            alert("请选择建议处理方式");
        }
        else if ( processTime=="")
        {
            alert("请选择建议处理时间");
        }
        else if (villageName=="")
        {
            alert("请选择所属辖区");
        }
        else {
            if (lat11==0)
            {
                bool=false;
                setTimeout(function(){
                    bool=true;
                },1500);
                $("#myPopup1").html("<a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><p>正在获取您的当前位置，请稍等。</p>")
                $("#myPopup1").popup('open');
                // 百度地图API功能
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398,39.897445);
                // map.centerAndZoom(point,12);

                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){

//            var mk = new BMap.Marker(r.point);
//            map.addOverlay(mk);
//            map.panTo(r.point);
//            alert('您的位置：'+r.point.lng+','+r.point.lat);


//            console.log(bd09togcj02(r.point.lng,r.point.lat));
                        var temp=bd09togcj02(r.point.lng,r.point.lat);
                        var newloc=gcj02towgs84(temp[0],temp[1]);

//            30.9124371686,120.5094498200
                        lon=newloc[0];
                        lat=newloc[1];
                        // alert(lon+","+lat);

                        uploadData();

                    }
                    else {
                        alert('failed'+this.getStatus());
                    }
                },{enableHighAccuracy: true})

            }
            else
            {
                console.log("2222");
                lon=lon11;
                lat=lat11;
                // alert(lon+","+lat);

                uploadData();


            }

        }
    })
    getShequ();
    if (localStorage["selectedentrust"])
    {
        // arr.splice(0,arr.length);
        var value = localStorage["selectedentrust"];
        var data= JSON.parse(value);
        document.getElementById("selectRiver").innerHTML=data.name;
        riverId=data.OID;
        riverName=data.name;
    }
    else
    {
        $("#selectRiver").click(function(event) {
            // window.location.href="selectRiver.html?type=1";
            var obj1 = document.getElementById("rivers");
            obj1.style.cssText = "display:block";
        })
    }
    // $("#selectRiver").click(function(event) {
    //     // window.location.href="selectRiver.html?type=1";
    //     var obj1 = document.getElementById("rivers");
    //     obj1.style.cssText = "display:block";
    // })
    var  token=$.cookie('zzwxToken');
    var rolesCode=$.cookie('RolesCode');

    $.ajax({
        type: "get",
        url: svc_own + "Ashx_River.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getRiverPageList",
            token:token,
            rolesCode:rolesCode,
            page:1,
            pageSize:999
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                // console.log(result.rows);
                var arr=result.rows;
                totalRiver=arr;
                for (var i=0;i<arr.length;i++)
                {
                    $("#selsectedRiver").html("");
                    $("#selsectedRiver").append(' <option value="99" disabled selected value>'+"请点击选择河湖"+'</option>');

                    for (var i=0;i<arr.length;i++)
                    {
                        $("#selsectedRiver").append('<option value='+i+'>'+arr[i]['name']+'</option>-->');

                    }


                }


            }
            else
            {
                bool=false;
                setTimeout(function(){
                    bool=true;
                },1500);
                $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
                $("#myPopup1").popup('open');

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取数据失败！");
        }
    });

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
                console.log("当前选择了以下文件：");
                console.log(selectFiles);
                console.log($("#photoContent").val());
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
                                    bool=true;
                                },1500);
                                $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
                                $("#myPopup1").popup('open');
                            }

                        }
                    });
                }
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
                    setTimeout(function(){
                        bool=true;
                    },1500);
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">发布失败！</h2><p>" +'身份证号未登记！'+ "</p>")
                    $("#myPopup1").popup('open');
                } else {
                    bool=false;
                    setTimeout(function(){
                        bool=true;
                    },1500);
                    i++;
                    $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>上传失败</p>")
                    $("#myPopup1").popup('open');
                    setTimeout(function () {
                        //window.location.reload();
                        // window.location.href = "RepairList.html";
                    }, 1500);
                }

            },
            onFailure: function (file, response) {          // 文件上传失败的回调方法
                console.log("此文件上传失败：");
                console.log(file.name);
            },
            onComplete: function (response) {           	  // 上传完成的回调方法
                console.log("文件上传完成");
                console.log(response);
            }
        });

    }



});

function uploadData() {
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
    var value1 = localStorage["selectedRivers"];

    var Data= JSON.parse(value1)
    var signCode=Data.signId;
    // images="/9d2e0454-ba56-4daf-8207-79fd3408fad7.png";
    // console.log("Ashx_Question.ashx?method=reportQuestion&token="+token+"&riverCode="+getParam("OID")+"&riverName="+getParam("riverName")+"&reportUserName="+userName+"&qType=2&lon="+lon+"&lat="+lat+"&address="+riverName+"&rType="+selectedtype+"&emergency="+emergency+"&processContent="+ $("#question").val()+"&signCode="+signCode+"&imgs="+images+"&videos=test&industryImg1=test&industryImg2=test&industryImg3=test&industryImg4=test&floater=test&ilegal=test&speed=test&guardrail=test&sewage=test&riverStatus=test&maintain=test"+"&villageCode="+villageCode+"&villageName="+villageName+"&processTime="+processTime);
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_Question.ashx?method=reportQuestion&token="+token+"&riverCode="+riverId+"&riverName="+riverName+"&reportUserName="+userName+"&qType=2&lon="+lon+"&lat="+lat+"&address="+riverName+"&rType="+selectedtype+"&rTypeName="+selectedtypeName+"&emergency="+emergency+"&processType="+processType+"&processTypeName="+processTypeName+"&content="+$("#question").val()+"&signCode="+signCode+"&processContent="+ $("#question").val()+"&imgs="+images+"&villageCode="+villageCode+"&villageName="+villageName+"&processTime="+processTime+"&processDateTime="+processDateTime+"&videos=test&industryImg1=test&industryImg2=test&industryImg3=test&industryImg4=test&floater=test&ilegal=test&speed=test&guardrail=test&sewage=test&riverStatus=test&maintain=test",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: null,
        success: function (result) {
            console.log(result);
            var idd=result.rows;
            if (result.isOK) {
                bool=false;
                setTimeout(function(){
                    bool=true;
                },1500);
                $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><p>提交成功</p>")
                $("#myPopup1").popup('open');
                if (emergency==2)
                {
                    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Question.ashx?method=pushTwoStar&riverCode=4132D548-B731-4A2E-9EBE-48FABDB8FAC1&riverName=頔塘&fromUser=74220137-48B9-4AB7-A119-DAB07929B990&questionCode=A1CEAC3B-98CB-4952-9285-C1D91F9C1168

                    var value1 = localStorage["selectedRivers"];

                    var Data= JSON.parse(value1)

                    var infoarr=Data.selectedRivers;
                    var endTime=getNowFormatDate();
                    // console.log(startTime+"ssss"+lon+","+lat);
                    $.ajax({
                        type: "get",
                        url: svc_own + "Ashx_Question.ashx",
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        data: {
                            method: "pushTwoStar",
                            riverCode: riverId,
                            fromUser:token,
                            questionCode:idd,
                            riverName:riverName,
                        },
                        success: function (result) {
                            // console.log(result);

                            if (result.isOK) {
                                console.log(result);

                                setTimeout(function(){
                                    $("#myPopup1").popup("close");
                                    // window.history.back();
                                    var pagenum= $.cookie('zzwxpage');
                                    window.history.go(-pagenum);
                                    return false;
                                },"3000");

                            }
                            else
                            {
                                console.log("nono")
                                setTimeout(function(){
                                    $("#myPopup1").popup("close");
                                    window.history.back();

                                },"3000");

                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            // alert("失败！");
                        }
                    });

                }
                else if(emergency==3)
                {
                    var value1 = localStorage["selectedRivers"];

                    var Data= JSON.parse(value1)

                    var infoarr=Data.selectedRivers;
                    var endTime=getNowFormatDate();
                    // console.log(startTime+"ssss"+lon+","+lat);
                    // var typp="";
                    $.ajax({
                        type: "get",
                        url: svc_own + "Ashx_Question.ashx",
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        data: {
                            method: "pushThreeStar",
                            riverCode: riverId,
                            fromUser:token,
                            questionCode:idd,
                            riverName:riverName,
                            type:selectedtype,
                        },
                        success: function (result) {
                            // console.log(result);

                            if (result.isOK) {
                                console.log(result);
                                setTimeout(function(){
                                    $("#myPopup1").popup("close");
                                    // window.history.back();
                                    location.href='patrol.html';
                                },"3000");

                            }
                            else
                            {
                                console.log("nono")
                                setTimeout(function(){
                                    $("#myPopup1").popup("close");
                                    window.history.back();

                                },"3000");

                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            // alert("失败！");
                        }
                    });
                }
                else
                {
                    setTimeout(function(){
                        $("#myPopup1").popup("close");
                        window.history.back();

                    },"3000");
                }
                // var value1 = localStorage["selectedRivers"];
                //
                // var Data= JSON.parse(value1)
                //
                // var infoarr=Data.selectedRivers;
                // var endTime=getNowFormatDate();
                // // console.log(startTime+"ssss"+lon+","+lat);
                // $.ajax({
                //     type: "get",
                //     url: svc_own + "Ashx_Question.ashx",
                //     dataType: 'jsonp',
                //     jsonp: 'callback',
                //     data: {
                //         method: "updateSign",
                //         token:token,
                //         id:Data.signId,
                //         endTime:"",
                //         endAddress:"",
                //         coordinate:"["+lat+","+lon+"]",
                //     },
                //     success: function (result1) {
                //         // console.log(result);
                //         if (result1.isOK) {
                //             console.log(result);
                //
                //
                //         }
                //         else
                //         {
                //             console.log("nono")
                //             $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                //             $("#myPopup1").popup('open');
                //
                //         }
                //     },
                //     error: function (XMLHttpRequest, textStatus, errorThrown) {
                //         alert("失败！");
                //     }
                // });
                // console.log(result.rows);
                // var arr=result.rows;




            }
            else
            {
                // bool=false;
                // setTimeout(function(){
                //     bool=true;
                // },1500);
                // $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                // $("#myPopup1").popup('open');
                alert(result.message)

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("失败！");
        }
    });

}
function getJianyi(idstr) {
    console.log(idstr);

    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_System.ashx?method=getDictionaryType&type=115

        var  token=$.cookie('zzwxToken');
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_System.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getDictionaryType",
            type:idstr
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                // console.log(result.rows);
                var arr=result.rows;
                jianyiArr=arr;
                // console.log(jianyiArr);
                console.log(jianyiArr);
                $("#jianyi").html("");
                $("#jianyi").append(' <option value="99" disabled selected value>'+"请点击选择处理方式"+'</option>');

                for (var i=0;i<arr.length;i++)
                {
                    $("#jianyi").append('<option value='+i+'>'+arr[i]['Names']+'</option>-->');

                }



            }
            else
            {
                bool=false;
                setTimeout(function(){
                    bool=true;
                },1500);
                $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
                $("#myPopup1").popup('open');

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取数据失败！");
        }
    });

}
function getShequ() {
    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_User.ashx?method=getCommunityList&userName=%E9%99%88%E7%90%A6
    var  userName=$.cookie('zzwxUserName');
    var rolesCode=$.cookie('RolesCode');
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_User.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getCommunityList",
            noAll:1,
            userName:userName,
            rolesCode:rolesCode
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                console.log(result.rows);
                var arr=result.rows;
                xaiquArr=arr;
                console.log(xaiquArr);
                $("#xiaqu").html("");
                $("#xiaqu").append(' <option value="99" disabled selected value>'+"请点击选择所属辖区"+'</option>');

                for (var i=0;i<arr.length;i++)
                {
                    $("#xiaqu").append('<option value='+i+'>'+arr[i]['name']+'</option>-->');

                }



            }
            else
            {
                bool=false;
                setTimeout(function(){
                    bool=true;
                },1500);
                $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
                $("#myPopup1").popup('open');

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取数据失败！");
        }
    });
}
function UPloadShequ(riverName) {
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_User.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getCommunityList",
            noAll:1,
            riverName:riverName
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                console.log(result.rows);
                var arr=result.rows;
                xaiquArr=arr;
                console.log(xaiquArr);
                $("#xiaqu").html("");
                $("#xiaqu").append(' <option value="99" disabled selected value>'+"请点击选择所属辖区"+'</option>');

                for (var i=0;i<arr.length;i++)
                {
                    $("#xiaqu").append('<option value='+i+'>'+arr[i]['name']+'</option>-->');

                }



            }
            else
            {
                bool=false;
                setTimeout(function(){
                    bool=true;
                },1500);
                $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
                $("#myPopup1").popup('open');

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取数据失败！");
        }
    });
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
            fileType: ["jpg", "JPG", "png", "gif", "jpeg", "PNG"],// 上传文件的类型
            fileSize: 5120000 ,                // 上传文件的大小
            multiple: true,                    // 是否可以多个文件上传
            fileNum: 4,
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
                                    bool=true;
                                },1500);
                                $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
                                $("#myPopup1").popup('open');
                            }

                        }
                    });
                }
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
                    setTimeout(function(){
                        bool=true;
                    },1500);
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">发布失败！</h2><p>" +'身份证号未登记！'+ "</p>")
                    $("#myPopup1").popup('open');
                } else {
                    bool=false;
                    setTimeout(function(){
                        bool=true;
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
}
function liclickselected(n) {
    var type=getParam("type");
    // localStorage.selectedriverinfo= JSON.stringify(totalRiver[n]);
    // if (type==1)
    // {
    //     window.history.back();
    // }else
    // {
    //     window.location.href = "basicInformation.html?";
    //
    // }

    document.getElementById("selectRiver").innerHTML=totalRiver[n].name;
    riverId=totalRiver[n].OID;
    console.log(totalRiver[n]);
    riverName=totalRiver[n].name;
    var obj1 = document.getElementById("rivers");
    obj1.style.cssText = "display:none";

    // var obj1 = document.getElementById("div2");
    // obj1.style.cssText = "opacity:0";


}
function hideImages() {
    showHistory=1;
    console.log("close");
    var obj2 = document.getElementById("images");
    obj2.style.cssText = "display:none";

}

/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullDownAction() {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var  token=$.cookie('zzwxToken');

        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getReportQuestionPageList",
                token:token,
                qType:2,
                page:1,
                pageSize:6,

            },
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    // console.log(result.rows);

                    var arr=result.rows;

                    $("#imageslist").html("");
                    for (var i=0;i<arr.length;i++)
                    {
                        var Data=arr[i];
                        strs=Data.imgs.split(",");
                        var imagestr="";
                        if (strs.length>0)
                        {
                            imagestr='<img src="'+strs[0]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px "/>';
                            if(strs.length>1)
                            {
                                for (var jk=1;jk<strs.length;jk++)
                                {
                                    imagestr=imagestr+'<img src="'+imageHeader+strs[jk]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px "/>';



                                }

                            }

                            console.log(imagestr);
                        }


                        console.log("asdadas");

                        $("#imageslist").append(imagestr
                        );


                    }


                }
                else
                {
                    bool=false;
                    setTimeout(function(){
                        bool=true;
                    },1500);
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
                    $("#myPopup1").popup('open');

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取数据失败！");
            }
        });

        generatedCount = 1;
        myScroll.refresh(); 	//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction() {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        generatedCount += 1;
        var  token=$.cookie('zzwxToken');
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getReportQuestionPageList",
                token:token,
                qType:2,
                page:generatedCount,
                pageSize:6,

            },
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    // console.log(result.rows);

                    var arr=result.rows;
                    for (var i=0;i<arr.length;i++) {
                        var Data = arr[i];
                        strs = Data.imgs.split(",");
                        var imagestr = "";
                        if (strs.length > 0) {
                            imagestr = '<img src="' + strs[0] + '" style="width: 100%"  style="margin: 0px 0px 0px 10px "/>';
                            if (strs.length > 1) {
                                for (var jk = 1; jk < strs.length; jk++) {
                                    imagestr = imagestr + '<img src="' + imageHeader + strs[jk] + '" style="width: 100%"  style="margin: 0px 0px 0px 10px "/>';


                                }

                            }

                            console.log(imagestr);
                        }


                        console.log("asdadas");

                        $("#imageslist").append(imagestr
                        );

                    }
                }
                else
                {
                    bool=false;
                    setTimeout(function(){
                        bool=true;
                    },1500);
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
                    $("#myPopup1").popup('open');

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取数据失败！");
            }
        });


        myScroll.refresh(); 	// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 初始化iScroll控件
 */
function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        scrollbarClass: 'myScrollbar', /* 重要样式 */
        useTransition: false, /* 此属性不知用意，本人从true改为false */
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                pullDownAction(); // Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction(); // Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
// document.addEventListener('DOMContentLoaded', loaded, false);
/**

 获取某日期后几个工作日后的日期
 参数:date:给定日期;itervalByDay:相隔工作日
 */
function getworkday(dat,itervalByDay){

    var str=dat.split("-");
    var date=new Date();
    date.setUTCFullYear(str[0], str[1] - 1, str[2]);
    date.setUTCHours(0, 0, 0, 0);
    var millisceonds =date.getTime();
    for(var i=1;i<=itervalByDay;i++){
        millisceonds +=24*60*60*1000;
        date.setTime(millisceonds);
        if(date.getDay()==0||date.getDay()==6) i--;
    }

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var rq = year + "-" + formatTen(month) + "-" + formatTen(day);

    return rq;
}