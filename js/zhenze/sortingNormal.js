var svcHeader = "http://112.81.63.243/ZZWaterDB/sharedService/";
// http://112.81.63.243/ZZWaterDB/sharedService/Ashx_System.ashx?method=uploadFile&token=b9813978d9674a60aeb2d8078fc52f28&file=
var svc_own = svcHeader;
var imageArr=[];
var selectedtype="水文化";
var emergency=0;
var type;
var totalRiver=[];
var riverId="";
var riverName="";


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
        uploadImage(file.files[i]);
        imgArr.push(imgUrl);

        var img = document.createElement("img");
        img.setAttribute("src", imgArr[i]);
        var imgAdd = document.createElement("div");
        imgAdd.setAttribute("class", "z_addImg");
        imgAdd.appendChild(img);
        imgContainer.appendChild(imgAdd);

    };


    imgRemove();
};

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
function uploadImage(file) {
    var formdata = new FormData();
    // //
    // var file = this.files[0];
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

                $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>+args.message+</p>")
                $("#myPopup1").popup('open');
            }

        }
    })
}
$(function () {


    var value = localStorage["rivv"];
    // console.log(value);
    var Data= JSON.parse(value)
    localStorage.removeItem("rivv");
    console.log(Data.imageScr);
    console.log(Data.imageUrl);
    imageArr.push(Data.imageUrl);
    var imgContainer = document.getElementsByClassName('z_photo')[0];
    var imgUrl = Data.imageScr

    var img = document.createElement("img");
    img.setAttribute("src", imgUrl);
    var imgAdd = document.createElement("div");
    imgAdd.setAttribute("class", "z_addImg");
    imgAdd.appendChild(img);
    imgContainer.appendChild(imgAdd);
    imgRemove();

    $("#fileSubmit").click(function(event) {
        uploadData();


    })

    $("#selectRiver").click(function(event) {
        // window.location.href="selectRiver.html?type=1";
        var obj1 = document.getElementById("rivers");
        obj1.style.cssText = "display:block";
    })

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
                // console.log("asdadas"+arr.length);
                for (var i=0;i<arr.length;i++)
                {
                    console.log("asdadas");
                    var type;
                    if (arr[i].keyType==null)
                    {
                        type="黑臭河道";

                    }
                    else {
                        type=arr[i].keyType;

                    }
                    $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 135px" onclick="liclickselected(\''+i+'\')">'
                        +'<div style="width: 90%;height: 30vw;margin-left: 10%;">'
                        +'<div style="width: 100%;height: 20px">'
                        +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
                        +'</div>'
                        +'<div style="width: 100%;height: 20px;margin-top: 15px">'
                        +'<label style="width: 100%;height: 20px;font-size: 16px;color: #666666;">'+"起点："+arr[i].startPoint+'</label>'
                        +'</div>'
                        +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                        +'<label style="width: 100%;height: 20px;font-size: 16px;color: #666666;">'+"止点："+arr[i].endPoint+'</label>'
                        +'</div>'
                        +'<div style="width: 100%;height: 32px;margin-top: 10px">'
                        +'<p style="padding-top: 0; color:#666666;font-size: 14px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">'+"所涉村："+arr[i].community+'</p>'
                        +'</div>'
                        +'</div>'
                        +'</li>'
                    );


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
                    // console.log(formdata);
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
    $("#myPopup").popup("close");
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_Question.ashx?method=reportQuestion&token="+token+"&riverCode="+riverId+"&riverName="+riverName+"&reportUserName="+userName+"&qType=1&lon="+lon+"&lat="+lat+"&address="+riverName+"&rType="+selectedtype+"&rTypeName="+selectedtype+"&emergency="+emergency+"&content="+ $("#question").val()+"&imgs="+images+"&videos=test&industryImg1=test&industryImg2=test&industryImg3=test&industryImg4=test&floater=test&ilegal=test&speed=test&guardrail=test&sewage=test&riverStatus=test&maintain=test",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: null,
        success: function (result) {
            console.log(result);
            if (result.isOK) {

                $("#myPopup").html(" <h2 style=\"text-align:center;\">提示</h2><p>你已经成功发布</p>")
                $("#myPopup").popup('open');
                // var value1 = localStorage["selectedRivers"];
                //
                // var Data= JSON.parse(value1)
                //
                // var infoarr=Data.selectedRivers;
                // console.log(result.rows);




            }
            else
            {
                console.log("nono")
                $("#myPopup").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                $("#myPopup").popup('open');

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("失败！");
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
                console.info("当前选择了以下文件：");
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
    // var type=getParam("type");
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
    console.log(riverId);
    riverName=totalRiver[n].name;
    var obj1 = document.getElementById("rivers");
    obj1.style.cssText = "display:none";

    // var obj1 = document.getElementById("div2");
    // obj1.style.cssText = "opacity:0";


}