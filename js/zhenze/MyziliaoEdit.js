var svcHeader = "http://112.81.63.243/ZZWaterDB/sharedService/";
// http://112.81.63.243/ZZWaterDB/sharedService/Ashx_System.ashx?method=uploadFile&token=b9813978d9674a60aeb2d8078fc52f28&file=
var svc_own = svcHeader;
var generatedCount=1;
var imageArr=[];
var selectedtype=0;
var selectedtypeName="";
var emergency=0;
var chulitype="";
var sewageDisposalType="";
var sewageDisposalTypeName="";
var riverId="";
var riverName="";
var jianyiArr=[];
var processType="";
var villageCode="";
var villageName="";
var xaiquArr=[];
var ziliaotype="";
var ziliaotypeid=12201;
var typeArr=[];
var bool=true;
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, state.title, state.url);
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
            w = 480 || w;              //480  你想压缩到多大，改这里
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
            img.addEventListener("click", function() {
                // console.log(base64);
                photoViewer(base64);
            })
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


                    }
                    else
                    {

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
        alert("请在微信中查看");
    }
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
        w = 480 || w;              //480  你想压缩到多大，改这里
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
$(function () {
    pushHistory();
    bool=true;
    window.addEventListener("popstate", function(e) {
        if(bool)
        {
            location.href='MyDetailziliao.html';  //在这里指定其返回的地址
        }
        pushHistory();

    }, false);
    var value = localStorage["selectedRecord"];
    var Data1= JSON.parse(value)

    console.log(Data1);
    setTimeout(function(){
        console.log("1111");
        $("#faname").val(Data1.enterpriseName);
        if(Data1.leader!=null)
        {
            $("#pername").val(Data1.leader);
        }
        if(Data1.phone!=null)
        {
            $("#phone").val(Data1.phone);
        }
        if(Data1.address!=null)
        {
            $("#address").val(Data1.address);
        }

        if(Data1.buildDate!=null)
        {
            $("#signInTime").val(Data1.buildDate);
        }
        if(Data1.portDistance!=null)
        {
            $("#distance").val(Data1.portDistance);
        }
        changeSelected(Data1['sewageDisposalTypeName'],'ttype');
        $('#ttype').selectmenu('refresh', true);
        changetype();

    },"1000");




    var strs= new Array(); //定义一数组
    strs=Data1.imgs.split(",");
    console.log(strs)
    if (strs.length>0)
    {
        for (var k=0;k<strs.length;k++)
        {
            console.log(strs[k]);
            var imgUrlArr=strs[k].split("/");
            // console.log()
            var imagName=imgUrlArr[imgUrlArr.length-1];
            imageArr.push(imagName);
            var imgContainer = document.getElementsByClassName('z_photo')[0];
            var imgUrl = strs[k];
            var img = document.createElement("img");
            img.setAttribute("src", imgUrl);
            img.addEventListener("click", function() {
                photoViewer(imgUrl);
            })
            var imgAdd = document.createElement("div");
            imgAdd.setAttribute("class", "z_addImg");
            imgAdd.appendChild(img);
            var addDiv = document.getElementsByClassName('z_file')[0];
            imgContainer.insertBefore(imgAdd,addDiv)
            imgRemove();
        }

    }

    // console.log(Data1.leader);
    // if(Data1.leader!=null)
    // {
    //
    //     document.getElementById("pername").innerHTML =Data1.leader;
    //     // $('#pername').checkboxradio('refresh');
    //
    // }

    // imageArr.push(Data1.imageUrl);
    // var imgContainer = document.getElementsByClassName('z_photo')[0];
    // var imgUrl = Data.imageScr
    //
    // var img = document.createElement("img");
    // img.setAttribute("src", imgUrl);
    // var imgAdd = document.createElement("div");
    // imgAdd.setAttribute("class", "z_addImg");
    // imgAdd.appendChild(img);
    // var addDiv = document.getElementsByClassName('z_file')[0];
    // imgContainer.insertBefore(imgAdd,addDiv)
    // imgRemove();



    // $('#phone').trigger("refresh");
    // if(Data1.enterpriseName!=null)
    // {
    //
    //     var psel = document.getElementById("faname");
    //
    //     document.getElementById("faname").innerHTML =Data1.enterpriseName;
    //     // console.log(psel.value);
    //
    //     // $("input").checkboxradio();
    //     // $("input[type='text']").checkboxradio("refresh");
    //
    //     // $('#faname').trigger("create");
    //
    // }
    // $("#ziliaotype").val(Data1['fileTypeName']);

    $("#fileSubmit").click(function(event) {



            uploadData();





    })

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
            console.log("22221")
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
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_River.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getRiverPageList",
            token:token,
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
                console.log("2222");
                changeSelected(Data1['riverName'],'selsectedRiver');
                $('#selsectedRiver').selectmenu('refresh', true);
                changeRiver();

            }
            else
            {
                console.log("nono")
                $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
                $("#myPopup1").popup('open');

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取数据失败！");
        }
    });
    getShequ();
    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Enterprise.ashx?method=getEnterprisePageList&page=1&pageSize=10
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_System.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getDictionaryType",
            type:122
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                // console.log(result.rows);
                var arr=result.rows;
                typeArr=arr;
                for (var i=0;i<arr.length;i++)
                {
                    $("#ziliaotype").html("");
                    $("#ziliaotype").append(' <option value="99" disabled selected value>'+"请点击选择资料类型"+'</option>');

                    for (var i=0;i<arr.length;i++)
                    {
                        $("#ziliaotype").append('<option value='+i+'>'+arr[i]['Names']+'</option>-->');
                        // if (arr[i]['Names'] == Data1['fileTypeName']) obj[i].selected = true;
                    }


                }
                console.log("3333");
                changeSelected(Data1['fileTypeName'],'ziliaotype');
                $('#ziliaotype').selectmenu('refresh', true);
                changezilaiotype();

            }
            else
            {
                console.log("nono")
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
                console.info("当前选择了以下文件：");
                console.info(selectFiles);
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
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">发布失败！</h2><p>" +'身份证号未登记！'+ "</p>")
                    $("#myPopup1").popup('open');
                } else {
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
                console.info("此文件上传失败：");
                console.info(file.name);
            },
            onComplete: function (response) {           	  // 上传完成的回调方法
                console.info("文件上传完成");
                console.info(response);
            }
        });

    }


});
function changeSelected(val,selectedid) {
    var obj = document.getElementById(selectedid).getElementsByTagName('option');
    for (var i = 0; i < obj.length; i ++) {
        // console.log(obj[i].value+"--"+val);

        if (obj[i].text == val)
        {
            // console.log(obj[i].text+"--"+val);
            obj[i].selected = true;

        }
        // break;

    }
}
function hideImages() {
    console.log("close");
    var obj2 = document.getElementById("images");
    obj2.style.cssText = "display:none";

}
function uploadData() {

    var value = localStorage["selectedRecord"];
    var Data1= JSON.parse(value)
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


    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Enterprise.ashx?method=reportEnterprise&token=test&riverCode=4132D548-B731-4A2E-9EBE-48FABDB8FAC1&riverName=test&reportUserName=test&lon=120.555708&lat=30.921256&address=test&imgs=test.png&enterpriseName=test&leader=test&phone=test&buildDate=test&test=portDistance&sewageDisposalType=12101&sewageDisposalTypeName=直排
    // console.log("Ashx_Enterprise.ashx?method=reportEnterprise&token="+token+"&riverCode="+riverId+"&riverName="+riverName+"&reportUserName="+userName+"&lon="+lon+"&lat="+lat+"&address="+riverName+"&imgs="+images+"&enterpriseName="+$("#faname").val()+"&leader="+$("#pername").val()+"&phone="+$("#phone").val()+"&buildDate="+$("#signInTime").val()+"&portDistance="+$("#distance").val()+"&sewageDisposalType="+chulitype+"&sewageDisposalTypeName="+chulitype+"&signCode="+signid+"&villageCode="+villageCode+"&villageName="+villageName);
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_Enterprise.ashx?method=updateEnterprise&lon="+Data1['lon']+"&lat="+Data1['lat']+"&address="+$("#address").val()+"&imgs="+images+"&enterpriseName="+$("#faname").val()+"&leader="+$("#pername").val()+"&phone="+$("#phone").val()+"&buildDate="+$("#signInTime").val()+"&portDistance="+$("#distance").val()+"&sewageDisposalType="+chulitype+"&sewageDisposalTypeName="+chulitype+"&villageCode="+villageCode+"&villageName="+villageName+"&fileType="+ziliaotypeid+"&fileTypeName="+ziliaotype+"&oid="+Data1['OID'],
        dataType: 'jsonp',
        jsonp: 'callback',
        data: null,
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><p>提交成功</p>")
                $("#myPopup1").popup('open');
                setTimeout(function(){
                    $("#myPopup1").popup("close");
                    window.history.go(-2);

                },"3000");
                // var value1 = localStorage["selectedRivers"];
                //
                // var Data= JSON.parse(value1)
                //
                // var infoarr=Data.selectedRivers;
                // var endTime=getNowFormatDate();
                // console.log(startTime+"ssss"+lon+","+lat);
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
                //     success: function (result) {
                //         // console.log(result);
                //         if (result.isOK) {
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
                console.log(result.rows);
                var arr=result.rows;




            }
            else
            {
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
                console.log(jianyiArr);
                $("#jianyi").html("");
                for (var i=0;i<arr.length;i++)
                {
                    $("#jianyi").append('<option value=i>'+arr[i]['Names']+'</option>-->');

                }



            }
            else
            {
                console.log("nono")
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
    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_User.ashx?method=getVillageManagerPageList&page=1&pageSize=10
    var value = localStorage["selectedRecord"];
    var Data1= JSON.parse(value)
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_User.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getVillageManagerPageList",
            page:1,
            pageSize:29

        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                // console.log(result.rows);
                var arr=result.rows;
                xaiquArr=arr;
                console.log(xaiquArr);
                $("#xiaqu").html("");
                $("#xiaqu").append(' <option value="99" disabled selected value>'+"请点击选择所属辖区"+'</option>');

                for (var i=0;i<arr.length;i++)
                {
                    $("#xiaqu").append('<option value='+i+'>'+arr[i]['UserName']+'</option>-->');

                }


                console.log("4444");
                changeSelected(Data1['villageName'],'xiaqu');
                $('#xiaqu').selectmenu('refresh', true);
                changexiaqu();

            }
            else
            {
                console.log("nono")
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
                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">发布失败！</h2><p>" +'身份证号未登记！'+ "</p>")
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