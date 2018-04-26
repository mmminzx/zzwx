/**
 * Created by jtzh on 2017/9/20.
 */
var status="0";
var back=0;
var svc_own = svcHeader;
var f1;
var bool=false;
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

function getByClass(oParent,sClass){
    var aEle = oParent.getElementsByTagName('*');      //获取父级元素下的所有元素
    var aResult = new Array();
    for(var i =0; i<aEle.length; i++){
        if(aEle[i].className == sClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
/**
 * dataURL to blob, ref to https://gist.github.com/fupslot/5015897
 * @param dataURI
 * @returns {Blob}
 */
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
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, state.title, state.url);
}

$(function () {


    pushHistory();


    bool=true;
    window.addEventListener("popstate", function(e) {
        if(bool)
        {
            location.href='Home.html';  //在这里指定其返回的地址
        }
        pushHistory();

    }, false);


    if ($.cookie('zzwxHistory')!=null)
    {
        $.cookie('zzwxHistory', "1", { expires: 1 });
    }
    else {

        $.cookie('zzwxHistory', "2", { expires: 1 });
    }
    console.log($.cookie('zzwxHistory'));
    localStorage.removeItem("selectedentrust");
    console.log("go")
    $("#xuncha").click(function(event) {


        signIn();
    });
    // status="0";

    var value = $.cookie('patrolStatus');
    console.log("patrolStatus"+value);



    if (value=="1")
    {
        $("#xuncha").unbind("click")
        $("#xuncha").click(function(event) {



                            // alert("签退成功");
            updatalocation();



        });

        var value1 = localStorage["selectedRivers"];

        var Data= JSON.parse(value1)



        // console.log(Data);
        $("#title").html("结束巡河");
        // $("#timelabel").append("开始时间："+Data.signTime);
        //
        // $("#riverlabel").append("巡查河流：");
        // var infoarr=Data.selectedRivers;
        // for (var i=0;i<infoarr.length;i++)
        // {
        //     $("#riverlabel").append(infoarr[i].name+"  ");
        //
        // }

        $("#tishi").html("");
        var obj = document.getElementById("xuncha");
        obj.style.cssText = "margin-top: 280px";
        var obj1 = document.getElementById("btnview");
        obj1.style.cssText = "background-image: url(../images/red.png);";
        $("#menu").append(
                '<a href="javaScript:;" class="file">'
            +'<div style="width: 50%;height: 33vw;text-align: center;float: left;">'
            +'<input id="file_2" type="file" accept="image/*" style="position: absolute;float:left; width:33%;height: 100px; padding:0px; margin:0px;opacity: 0 !important">'
            +'<div style="width: 100%;height: 70%;">'
            +'<img src="../images/yichang(1).png" style=" margin-top: 8px;">'
            +'</div>'
            +'<label style="width: 100%;text-align: center;height: 16px;color: black;font-size: 18px">'+"异常上报"+'</label>'
            +'</div>'
            +'</a>'
        +'<a href="javaScript:;" class="file">'
        +'<div style="width: 50%;height: 33vw;text-align: center;float: left;">'
        +'<input id="file_1" type="file" accept="image/*" style="position: absolute;float:left; width:33%;height: 100px; padding:0px; margin:0px;opacity: 0 !important">'
        +'<div style="width: 100%;height: 70%;">'
        +'<img src="../images/dianzan.png" style=" margin-top: 8px;">'
        +'</div>'
        +'<label style="width: 100%;text-align: center;height: 16px;color: black;font-size: 18px">'+"亮点推送"+'</label>'
        +'</div>'
        +'</a>'
            +'<a href="javaScript:;" class="file">'
            +'<div style="width: 50%;height: 33vw;text-align: center;float: left;">'
            +'<input id="file_4" type="file" accept="image/*" style="position: absolute;float:left; width:33%;height: 100px; padding:0px; margin:0px;opacity: 0 !important">'
            +'<div style="width: 100%;height: 70%;">'
            +'<img src="../images/Photocamera.png" style=" margin-top: 8px;">'
            +'</div>'
            +'<label style="width: 100%;text-align: center;height: 16px;color: black;font-size: 18px">'+"工作照片"+'</label>'
            +'</div>'
            +'</a>'
            +'<a href="javaScript:;" class="file">'
            +'<div style="width: 50%;height: 33vw;text-align: center;float: left;">'
            +'<input id="file_3" type="file" accept="image/*" style="position: absolute;float:left; width:33%;height: 100px; padding:0px; margin:0px;opacity: 0">'
            +'<div style="width: 100%;height: 70%;">'
            +'<img src="../images/Cabinet.png" style=" margin-top: 8px;">'
            +'</div>'
            +'<label style="width: 100%;text-align: center;height: 16px;color: black;font-size: 18px">'+"资料积累"+'</label>'
            +'</div>'
            +'</a>'
        );

    }

    $("#file_1").change(function () {
        var obj1 = document.getElementById("mask");
        obj1.style.cssText = "display:block";

        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;


        var file = this.files[0];
        var lat1=0;
        var lon1=0;

        if (file && file.name) {

            EXIF.getData(file, function() {
                 // alert(EXIF.pretty(this));
                var exifData = EXIF.getTag(this,'GPSLatitude');

                if (exifData) {
                    var du=exifData[0]['numerator']/exifData[0]['denominator'];
                    var fen=exifData[1]['numerator']/exifData[1]['denominator'];
                    var miao=exifData[2]['numerator']/exifData[2]['denominator'];
                    lat1=DegreeConvertBack(du,fen,miao);
                    // alert(lat1);
                } else {
                    console.log("No EXIF data found in image '" + file.name + "'.");
                }
                var exifData2 = EXIF.getTag(this,'GPSLongitude');
                if (exifData2) {
                    var du2=exifData2[0]['numerator']/exifData[0]['denominator'];
                    var fen2=exifData2[1]['numerator']/exifData[1]['denominator'];
                    var miao2=exifData2[2]['numerator']/exifData[2]['denominator'];
                    lon1=DegreeConvertBack(du2,fen2,miao2);
                    console.log(lon1);
                }
            });
        }

        var dataURL;




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
            ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏
            ctx.drawImage(that, 0, 0, w, h);

            var base64 = canvas.toDataURL('image/jpg', 1 || 0.8);   //1最清晰，越低越模糊。有一点不清楚这里明明设置的是jpeg。弹出 base64 开头的一段 data：image/png;却是png。哎开心就好，开心就好
            f1 =base64;   // 把base64数据丢过去，上传要用。
            var blob = dataURItoBlob(base64); // 上一步中的函数
            var dataURL = canvas.toDataURL('image/jpg', 0.7);
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
                        console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
                        var  imagepUrl=args.rows[0].imgUrl;
                        console.log(imagepUrl);
                        var riverDic={
                            "imageScr":f1,
                            "imageUrl":imagepUrl,
                            "Latitude":lat1,
                            "Longitude":lon1

                        };
                        var obj1 = document.getElementById("mask");
                        obj1.style.cssText = "display:none";
                        localStorage.rivv = JSON.stringify(riverDic);
                        $.cookie('zzwxpage', 1);
                        window.location.href="NormalReport.html";


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
        // var reader = new FileReader();
        // var params = {"mediaType": 3};
        // reader.onloadend = function () {
        //     // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        //     var dataURL = reader.result;
        //     var img = new Image();
        //     var blob = dataURItoBlob(dataURL);
        //     var fileType = blobBin.type.split("/")[1];
        //     params.fileType = fileType;
        //     formdata.append('file', blob);
        //
        // };
        //
        // reader.readAsDataURL(file); // 读出 base64
        // // formdata.append('file', file);
        // console.log(formdata);






        // var $file = $(this);
        // var fileObj = $file[0];
        // var windowURL = window.URL || window.webkitURL;
        //
        //
        // var file = this.files[0];
        // var lat1=0;
        // var lon1=0;
        //
        // if (file && file.name) {
        //
        //     EXIF.getData(file, function() {
        //          // alert(EXIF.pretty(this));
        //         var exifData = EXIF.getTag(this,'GPSLatitude');
        //
        //         if (exifData) {
        //             var du=exifData[0]['numerator']/exifData[0]['denominator'];
        //             var fen=exifData[1]['numerator']/exifData[1]['denominator'];
        //             var miao=exifData[2]['numerator']/exifData[2]['denominator'];
        //             lat1=DegreeConvertBack(du,fen,miao);
        //             // alert(lat1);
        //         } else {
        //             console.log("No EXIF data found in image '" + file.name + "'.");
        //         }
        //         var exifData2 = EXIF.getTag(this,'GPSLongitude');
        //         if (exifData2) {
        //             var du2=exifData2[0]['numerator']/exifData[0]['denominator'];
        //             var fen2=exifData2[1]['numerator']/exifData[1]['denominator'];
        //             var miao2=exifData2[2]['numerator']/exifData[2]['denominator'];
        //             lon1=DegreeConvertBack(du2,fen2,miao2);
        //             console.log(lon1);
        //         }
        //     });
        // }
        //
        // var dataURL;
        //
        //
        //
        //
        // var formdata = new FormData();
        //
        // var imgUrl = window.URL.createObjectURL(file);
        //
        //
        // var img = new Image();
        // img.src = imgUrl;        // 传过来的图片路径在这里用。
        // img.onload = function () {
        //     var that = this;
        //     //生成比例
        //     var w = that.width,
        //         h = that.height,
        //         scale = w / h;
        //     w = 480 || w;              //480  你想压缩到多大，改这里
        //     h = w / scale;
        //
        //     //生成canvas
        //     var canvas = document.createElement('canvas');
        //
        //     var ctx = canvas.getContext('2d');
        //
        //     $(canvas).attr({width: w, height: h});
        //
        //     ctx.drawImage(that, 0, 0, w, h);
        //
        //     var base64 = canvas.toDataURL('image/jpeg', 1 || 0.8);   //1最清晰，越低越模糊。有一点不清楚这里明明设置的是jpeg。弹出 base64 开头的一段 data：image/png;却是png。哎开心就好，开心就好
        //     // console.log(base64);
        //
        //     f1 =base64;   // 把base64数据丢过去，上传要用。
        // }
        //
        // console.log(file);
        // formdata.append('file', file);
        // console.log(formdata);


        // $.ajax({
        //     url: svc_own + "Ashx_System.ashx?method=uploadFile",
        //     type: 'POST',
        //     dataType:"json",
        //     data: formdata,
        //     contentType: false,
        //     processData: false,
        //     success: function (args) {
        //
        //         if (args.isOK==1)
        //         {
        //             // console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
        //           var  imagepUrl=args.rows[0].imgUrl;
        //             console.log(imagepUrl);
        //             var riverDic={
        //                 "imageScr":f1,
        //                 "imageUrl":imagepUrl,
        //                 "Latitude":lat1,
        //                 "Longitude":lon1
        //
        //             };
        //             localStorage.rivv = JSON.stringify(riverDic);
        //             window.location.href="NormalReport.html";
        //
        //
        //         }
        //         else
        //         {
        //
        //             $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
        //             $("#myPopup1").popup('open');
        //         }
        //
        //     }
        // });



    });

    $("#file_2").change(function () {
        var obj1 = document.getElementById("mask");
        obj1.style.cssText = "display:block";
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;


        var file = this.files[0];
        var lat1=0;
        var lon1=0;
        if (file && file.name) {
            EXIF.getData(file, function() {
                var exifData = EXIF.getTag(this,'GPSLatitude');
                if (exifData) {
                    var du=exifData[0]['numerator']/exifData[0]['denominator'];
                    var fen=exifData[1]['numerator']/exifData[1]['denominator'];
                    var miao=exifData[2]['numerator']/exifData[2]['denominator'];
                    lat1=DegreeConvertBack(du,fen,miao);
                    console.log(lat1);
                } else {
                    console.log("No EXIF data found in image '" + file.name + "'.");
                }
                var exifData2 = EXIF.getTag(this,'GPSLongitude');
                if (exifData2) {
                    var du2=exifData2[0]['numerator']/exifData[0]['denominator'];
                    var fen2=exifData2[1]['numerator']/exifData[1]['denominator'];
                    var miao2=exifData2[2]['numerator']/exifData[2]['denominator'];
                    lon1=DegreeConvertBack(du2,fen2,miao2);
                    console.log(lon1);
                }
            });
        }


        var dataURL;




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
             // console.log(base64);

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
                        console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
                        var  imagepUrl=args.rows[0].imgUrl;
                        console.log(imagepUrl);
                        var riverDic={
                            "imageScr":f1,
                            "imageUrl":imagepUrl,
                            "Latitude":lat1,
                            "Longitude":lon1

                        };
                        var obj1 = document.getElementById("mask");
                        obj1.style.cssText = "display:none";
                        localStorage.rivv = JSON.stringify(riverDic);
                        $.cookie('zzwxpage', 1);
                        window.location.href="abnormalReported.html";


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
        // formdata.append('file', file);
        // // console.log(formdata);
        //
        //
        // $.ajax({
        //     url: svc_own + "Ashx_System.ashx?method=uploadFile",
        //     type: 'POST',
        //     dataType:"json",
        //     data: formdata,
        //     contentType: false,
        //     processData: false,
        //     success: function (args) {
        //
        //         if (args.isOK==1)
        //         {
        //             // console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
        //             var  imagepUrl=args.rows[0].imgUrl;
        //             console.log(imagepUrl);
        //
        //
        //
        //                 var riverDic={
        //                     "imageScr":f1,
        //                     "imageUrl":imagepUrl,
        //                     "Latitude":lat1,
        //                     "Longitude":lon1
        //                 };
        //                 localStorage.rivv = JSON.stringify(riverDic);
        //                 window.location.href="abnormalReported.html";
        //             // }
        //
        //             // var reader = new FileReader();
        //             // reader.readAsDataURL(file);
        //             //
        //             // reader.onload = function(e){
        //             //     //alert(3333)
        //             //     console.log(this.result);
        //             //
        //             //     var riverDic={
        //             //         "imageScr":this.result,
        //             //         "imageUrl":imagepUrl
        //             //     };
        //             //     localStorage.rivv = JSON.stringify(riverDic);
        //             //     window.location.href="abnormalReported.html";
        //             //     // window.location.href="clearupReport.html";
        //             // }
        //         }
        //         else
        //         {
        //
        //             $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
        //             $("#myPopup1").popup('open');
        //         }
        //
        //     }
        // });


    });
    $("#file_3").change(function () {
        var obj1 = document.getElementById("mask");
        obj1.style.cssText = "display:block";
        console.log("asdsd")
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;


        var file = this.files[0];


        var lat1=0;
        var lon1=0;
        if (file && file.name) {
            EXIF.getData(file, function() {
                var exifData = EXIF.getTag(this,'GPSLatitude');
                if (exifData) {
                    var du=exifData[0]['numerator']/exifData[0]['denominator'];
                    var fen=exifData[1]['numerator']/exifData[1]['denominator'];
                    var miao=exifData[2]['numerator']/exifData[2]['denominator'];
                    lat1=DegreeConvertBack(du,fen,miao);
                    console.log(lat1);
                } else {
                    console.log("No EXIF data found in image '" + file.name + "'.");
                }
                var exifData2 = EXIF.getTag(this,'GPSLongitude');
                if (exifData2) {
                    var du2=exifData2[0]['numerator']/exifData[0]['denominator'];
                    var fen2=exifData2[1]['numerator']/exifData[1]['denominator'];
                    var miao2=exifData2[2]['numerator']/exifData[2]['denominator'];
                    lon1=DegreeConvertBack(du2,fen2,miao2);
                    console.log(lon1);
                }
            });
        }

        var dataURL;




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
                        console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
                        var  imagepUrl=args.rows[0].imgUrl;
                        console.log(imagepUrl);
                        var riverDic={
                            "imageScr":f1,
                            "imageUrl":imagepUrl,
                            "Latitude":lat1,
                            "Longitude":lon1

                        };
                        var obj1 = document.getElementById("mask");
                        obj1.style.cssText = "display:none";
                        localStorage.rivv = JSON.stringify(riverDic);
                        $.cookie('zzwxpage', 1);
                        window.location.href="suishoupai.html";


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






        // formdata.append('file', file);
        // console.log(formdata);
        //
        //
        // $.ajax({
        //     url: svc_own + "Ashx_System.ashx?method=uploadFile",
        //     type: 'POST',
        //     dataType:"json",
        //     data: formdata,
        //     contentType: false,
        //     processData: false,
        //     success: function (args) {
        //
        //         if (args.isOK==1)
        //         {
        //             // console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
        //             var  imagepUrl=args.rows[0].imgUrl;
        //             console.log(imagepUrl);
        //             var riverDic={
        //                 "imageScr":f1,
        //                 "imageUrl":imagepUrl,
        //                 "Latitude":lat1,
        //                 "Longitude":lon1
        //             };
        //             localStorage.rivv = JSON.stringify(riverDic);
        //             window.location.href="suishoupai.html";
        //             // var reader = new FileReader();
        //             // reader.readAsDataURL(file);
        //             //
        //             // reader.onload = function(e){
        //             //     //alert(3333)
        //             //     console.log(this.result);
        //             //
        //             //
        //             //
        //             //
        //             //
        //             //
        //             //     var riverDic={
        //             //         "imageScr":this.result,
        //             //         "imageUrl":imagepUrl
        //             //     };
        //             //     localStorage.rivv = JSON.stringify(riverDic);
        //             //     window.location.href="suishoupai.html";
        //             //     // window.location.href="clearupReport.html";
        //             // }
        //         }
        //         else
        //         {
        //
        //             $("#myPopup").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
        //             $("#myPopup").popup('open');
        //         }
        //
        //     }
        // });



    });
    $("#file_4").change(function () {
        //
        // var obj1 = document.getElementById("mask");
        // obj1.style.cssText = "display:block";
        // console.log("asdsd")
        // var $file = $(this);
        // var fileObj = $file[0];
        // var windowURL = window.URL || window.webkitURL;
        //
        //
        // var file = this.files[0];
        //
        //
        // var lat1=0;
        // var lon1=0;
        // if (file && file.name) {
        //     EXIF.getData(file, function() {
        //         var exifData = EXIF.getTag(this,'GPSLatitude');
        //         if (exifData) {
        //             var du=exifData[0]['numerator']/exifData[0]['denominator'];
        //             var fen=exifData[1]['numerator']/exifData[1]['denominator'];
        //             var miao=exifData[2]['numerator']/exifData[2]['denominator'];
        //             lat1=DegreeConvertBack(du,fen,miao);
        //             console.log(lat1);
        //         } else {
        //             console.log("No EXIF data found in image '" + file.name + "'.");
        //         }
        //         var exifData2 = EXIF.getTag(this,'GPSLongitude');
        //         if (exifData2) {
        //             var du2=exifData2[0]['numerator']/exifData[0]['denominator'];
        //             var fen2=exifData2[1]['numerator']/exifData[1]['denominator'];
        //             var miao2=exifData2[2]['numerator']/exifData[2]['denominator'];
        //             lon1=DegreeConvertBack(du2,fen2,miao2);
        //             console.log(lon1);
        //         }
        //     });
        // }
        //
        // var dataURL;
        //
        //
        //
        //
        // var formdata = new FormData();
        //
        // var imgUrl = window.URL.createObjectURL(file);
        //
        //
        // var img = new Image();
        // img.src = imgUrl;        // 传过来的图片路径在这里用。
        // img.onload = function () {
        //     var that = this;
        //     //生成比例
        //     var w = that.width,
        //         h = that.height,
        //         scale = w / h;
        //     w = 1000 || w;              //480  你想压缩到多大，改这里
        //     h = w / scale;
        //
        //     //生成canvas
        //     var canvas = document.createElement('canvas');
        //
        //     var ctx = canvas.getContext('2d');
        //
        //     $(canvas).attr({width: w, height: h});
        //
        //     ctx.drawImage(that, 0, 0, w, h);
        //
        //     var base64 = canvas.toDataURL('image/jpg', 1 || 0.8);   //1最清晰，越低越模糊。有一点不清楚这里明明设置的是jpeg。弹出 base64 开头的一段 data：image/png;却是png。哎开心就好，开心就好
        //     console.log(base64);
        //
        //     f1 =base64;   // 把base64数据丢过去，上传要用。
        //     var blob = dataURItoBlob(base64); // 上一步中的函数
        //     var dataURL = canvas.toDataURL('image/jpg', 0.5);
        //     var fd = new FormData(document.forms[0]);
        //     formdata.append("file", blob, 'image.jpg');
        //     // formdata.append('file', file)
        //     $.ajax({
        //         url: svc_own + "Ashx_System.ashx?method=uploadFile",
        //         type: 'POST',
        //         dataType:"json",
        //         data: formdata,
        //         contentType: false,
        //         processData: false,
        //         success: function (args) {
        //             console.log(args)
        //             if (args.isOK==1)
        //             {
        //                 console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
        //                 var  imagepUrl=args.rows[0].imgUrl;
        //                 console.log(imagepUrl);
        //                 var riverDic={
        //                     "imageScr":f1,
        //                     "imageUrl":imagepUrl,
        //                     "Latitude":lat1,
        //                     "Longitude":lon1
        //
        //                 };
        //                 var obj1 = document.getElementById("mask");
        //                 obj1.style.cssText = "display:none";
        //                 localStorage.rivv = JSON.stringify(riverDic);
        //                 $.cookie('zzwxpage', 1);
        //                 window.location.href="WorkPhoto.html";
        //
        //
        //             }
        //             else
        //             {
        //                 bool=false;
        //                 setTimeout(function(){
        //                     bool=true;
        //                 },1500);
        //                 $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
        //                 $("#myPopup1").popup('open');
        //             }
        //
        //         }
        //     });
        // }




        var obj1 = document.getElementById("mask");
        obj1.style.cssText = "display:block";
        console.log("asdsd")
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;


        var file = this.files[0];


        var lat1=0;
        var lon1=0;
        if (file && file.name) {
            EXIF.getData(file, function() {
                var exifData = EXIF.getTag(this,'GPSLatitude');
                if (exifData) {
                    var du=exifData[0]['numerator']/exifData[0]['denominator'];
                    var fen=exifData[1]['numerator']/exifData[1]['denominator'];
                    var miao=exifData[2]['numerator']/exifData[2]['denominator'];
                    lat1=DegreeConvertBack(du,fen,miao);
                    console.log(lat1);
                } else {
                    console.log("No EXIF data found in image '" + file.name + "'.");
                }
                var exifData2 = EXIF.getTag(this,'GPSLongitude');
                if (exifData2) {
                    var du2=exifData2[0]['numerator']/exifData[0]['denominator'];
                    var fen2=exifData2[1]['numerator']/exifData[1]['denominator'];
                    var miao2=exifData2[2]['numerator']/exifData[2]['denominator'];
                    lon1=DegreeConvertBack(du2,fen2,miao2);
                    console.log(lon1);
                }
            });
        }

        var dataURL;




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
            w = 700 || w;              //480  你想压缩到多大，改这里
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
                        console.log(args.rows[0].imgUrl);  /*服务器端的图片地址*/
                        var  imagepUrl=args.rows[0].imgUrl;
                        console.log(imagepUrl);
                        var riverDic={
                            "imageScr":f1,
                            "imageUrl":imagepUrl,
                            "Latitude":lat1,
                            "Longitude":lon1

                        };
                        var obj1 = document.getElementById("mask");
                        obj1.style.cssText = "display:none";
                        localStorage.rivv = JSON.stringify(riverDic);
                        $.cookie('zzwxpage', 1);
                        window.location.href="WorkPhoto.html";


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






    });
function readBlobAsDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);};
    a.readAsDataURL(blob);
}
// function base64ToString(data) {
//     var result = '';
//     var leftbits = 0; // number of bits decoded, but yet to be appended
//     var leftdata = 0; // bits decoded, but yet to be appended
//
//     // Convert one by one.
//     for (var i = 0; i < data.length; i++) {
//         var c = toBinaryTable[data.charCodeAt(i) & 0x7f];
//         var padding = (data.charCodeAt(i) == base64Pad.charCodeAt(0));
//         // Skip illegal characters and whitespace
//         if (c == -1) continue;
//
//         // Collect data into leftdata, update bitcount
//         leftdata = (leftdata << 6) | c;
//         leftbits += 6;
//
//         // If we have 8 or more bits, append 8 bits to the result
//         if (leftbits >= 8) {
//             leftbits -= 8;
//             // Append if not padding.
//             if (!padding)
//                 result += String.fromCharCode((leftdata >> leftbits) & 0xff);
//             leftdata &= (1 << leftbits) - 1;
//         }
//
//     }
//
//
//
//     // If there are any bits left, the base64 string was corrupted
//
//     if (leftbits)
//         throw Components.Exception('Corrupted base64 string');
//     return result;
// }
function getFullPath(obj) {
    if (obj) {
        //Internet Explorer
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
        }
        //Firefox
        if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }

        //兼容chrome、火狐等，HTML5获取路径
        if (typeof FileReader != "undefined") {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("pic").src = e.target.result + "";
            }
            reader.readAsDataURL(obj.files[0]);
        } else if (browserVersion.indexOf("SAFARI") > -1) {
            alert("暂时不支持Safari浏览器!");
        }

    }
}
// 签到
function signIn() {
    back=1;
    bool=false;
    setTimeout(function(){
        bool=true;
    },1500);
    $("#myPopup").html("<a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\"><p>正在获取您的当前位置，请稍等。</p>")
    $("#myPopup").popup('open');




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
            console.log('您的位置：'+r.point.lng+','+r.point.lat);

            lon=r.point.lng;
            lat=r.point.lat;
//            console.log(bd09togcj02(r.point.lng,r.point.lat));
            var temp=bd09togcj02(r.point.lng,r.point.lat);
            var newloc=gcj02towgs84(temp[0],temp[1]);

//            30.9124371686,120.5094498200
            lon=newloc[0];
            lat=newloc[1];


            var  token=$.cookie('zzwxToken');

            var endTime=getNowFormatDate();
            var startTime=getNowFormatDate();
            console.log(startTime+"ssss"+lon+","+lat);
            $.ajax({
                type: "get",
                url: svc_own + "Ashx_Question.ashx",
                dataType: 'jsonp',
                jsonp: 'callback',
                data: {
                    method: "addSign",
                    token:token,
                    startTime:startTime,
                    startAddress:"",
                    coordinate:"["+lat+","+lon+"]",
                },
                success: function (result) {
                    // console.log(result);
                    if (result.isOK) {
                        console.log(result);
                        // localStorage.patrolStatus = "1";

                        var date = new Date();
                        date.setTime(date.getTime()+60*1000*60*5);
                        $.cookie('patrolStatus', "1", { expires: date });
                        var riverDic={
                            "signId":result.rows,
                            "signTime":getNowFormatDate()
                        };
                        back=1;

                        localStorage.selectedRivers = JSON.stringify(riverDic);
                        // location.reload();
                        // location.replace();
                        // var date = new Date();
                        // // expiresDate.setTime(expire.getTime() + (? * 60 * 1000));
                        // date.setTime(date.getTime()+300*1000);
                        // $.cookie('zzwxHistory', "2", { expires: 1 });


                        location.replace("patrol.html");
                        console.log($.cookie('patrolStatus'));
                    }
                    else
                    {
                        console.log("nono")
                        bool=false;
                        setTimeout(function(){
                            bool=true;
                        },1500);
                        $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                        $("#myPopup1").popup('open');

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败！");
                }
            });


        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true})

}

function updatalocation() {
    // alert("正在获取您的当前位置，请稍等。");
    bool=false;
    setTimeout(function(){
        bool=true;
    },1500);
    $("#myPopup").html("<a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\"><p>正在获取您的当前位置，请稍等。</p>")
    $("#myPopup").popup('open');
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
           var lon1=newloc[0];
           var lat1=newloc[1];
            // alert(lon+","+lat);
//
            var  token=$.cookie('zzwxToken');
//            console.log(newloc);
            var value1 = localStorage["selectedRivers"];

            var Data= JSON.parse(value1)

            // var infoarr=Data.selectedRivers;
            var endTime=getNowFormatDate();
            console.log(Data.signId);
            $.ajax({
                type: "get",
                url: svcHeader + "Ashx_Question.ashx",
                dataType: 'jsonp',
                jsonp: 'callback',
                data: {
                    method: "updateSign",
                    token:token,
                    id:Data.signId,
                    endTime:endTime,
                    endAddress:"",
                    coordinate:"["+lat1+","+lon1+"]",
                    // coordinate:"[30.9124371686,120.5094498200]",
                },
                success: function (result) {
                    console.log(result);
                    if (result.isOK) {
                        console.log(result);
                        alert("签退成功");
                        var date = new Date();
                        date.setTime(date.getTime()+60*1000*60);
                        // $.cookie('patrolStatus', "0");
                        $.cookie('patrolStatus', "0", { expires: date });
                        window.location.href="Home.html";


                    }
                    else
                    {
                        console.log("nono")
                        bool=false;
                        setTimeout(function(){
                            bool=true;
                        },1500);
                        $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                        $("#myPopup1").popup('open');

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("失败！");
                }
            });
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true})






//     // 百度地图API功能
//     var map = new BMap.Map("allmap");
//     var point = new BMap.Point(116.331398,39.897445);
//     // map.centerAndZoom(point,12);
//
//     var geolocation = new BMap.Geolocation();
//     geolocation.getCurrentPosition(function(r){
//         if(this.getStatus() == BMAP_STATUS_SUCCESS){
// //            var mk = new BMap.Marker(r.point);
// //            map.addOverlay(mk);
// //            map.panTo(r.point);
// //            alert('您的位置：'+r.point.lng+','+r.point.lat);
//
//             lon=r.point.lng;
//             lat=r.point.lat;
//
//             var value1 = localStorage["selectedRivers"];
//
//             var Data= JSON.parse(value1)
//
//             var infoarr=Data.selectedRivers;
//             var endTime=getNowFormatDate();
//             console.log(endTime+"ssss"+lon+","+lat);
//             $.ajax({
//                 type: "get",
//                 url: svcHeader + "Ashx_Question.ashx",
//                 dataType: 'jsonp',
//                 jsonp: 'callback',
//                 data: {
//                     method: "updateSign",
//                     token:token,
//                     id:Data.signId,
//                     endTime:endTime,
//                     endAddress:"",
//                     coordinate:"["+lat+","+lon+"]",
//                 },
//                 success: function (result) {
//                     // console.log(result);
//                     if (result.isOK) {
//                         console.log(result);
//                         alert("签退成功");
//                         localStorage.patrolStatus = "0";
//                         // var Data= JSON.parse(value1)
//                         localStorage.removeItem('selectedRivers');
//
//                         $("#xuncha").click(function(event) {
//                             back=1;
//                             window.location.href="patrolRivers.html";
//                         });
//                         location.reload();
//
//                     }
//                     else
//                     {
//                         console.log("nono")
//                         $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
//                         $("#myPopup1").popup('open');
//
//                     }
//                 },
//                 error: function (XMLHttpRequest, textStatus, errorThrown) {
//                     alert("失败！");
//                 }
//             });
//
//
//
//
//         }
//         else {
//             alert('failed'+this.getStatus());
//         }
//     },{enableHighAccuracy: true})
}
function click1() {
    // console.log("patrolselectRiver.html?type=1")
    window.location.href="NormalReport.html?type=1";
}
function click2() {
    window.location.href="abnormalReported.html?type=2";
    // window.location.href="NormalReport.html";
}

function click3() {

    window.location.href="suishoupai.html"

}})
function DegreeConvertBack(du,fen,miao)
{ ///<summary>度分秒转换成为度</summary>
    // var du = du;
    // var fen = value.split("°")[1].split("'")[0];
    // var miao = value.split("°")[1].split("'")[1].split('"')[0];
    var a=Math.abs(du)+(Math.abs(fen)/60+Math.abs(miao)/3600);
    // return Math.abs(du) + "." + (Math.abs(fen)/60 + Math.abs(miao)/3600);
    return a;


}
// //微信
// function getsign() {
//     $.ajax({
//         url: "http://wechat.dsmlyw.com/test2/getSignature.php",
//         success: function (data) {
//             console.log(data);
//
//         }
//
//     })
//     // $.ajax({
//     //     url: "http://wechat.dsmlyw.com/test2/getSignature.php",
//     //     type: 'POST',
//     //     dataType:"json",
//     //     data: null,
//     //     contentType: false,
//     //     processData: false,
//     //     success: function (args) {
//     //         console.log(args);
//     //
//     //     }
//     // });
// }