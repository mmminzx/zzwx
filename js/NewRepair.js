﻿var svcHeader = (window.location.protocol ? (window.location.protocol + "//")
: "")
+ window.location.host;
var svc_cw = svcHeader + "/JTService/Repair.svc";
//var randomID;
//$.ajax({
//    type: "get",
//    url: svc_cw + "/createRandomID?",
//    success: function (data) {
//        randomID = data;
//        //console.log(randomID);
//    }
//})

$(function () {
    var i = 0;
    if (i == 0) {

        //if ($.cookie("LoginID") == null || $.cookie("LoginID") == 'null') {
        //    window.location.href = "Login.html?Arrow=NewRepair";
        //} else {
            // 初始化插件
            $("#zyupload").zyUpload({
                fileInput: null,
                uploadInput: null,
                width: "100%",                 // 宽度
                height: "100%",                 // 宽度
                itemWidth: "64px",                 // 文件项的宽度
                itemHeight: "64px",                 // 文件项的高度
                //url: "/WEI/Data/AddRepair.ashx?location=" + $("#xiaoqu").val() + "&userID=" + "1" + "&repairContent=" + $("#repair_content").val(),  // 上传文件的路径
                fileType: ["jpg", "JPG", "png", "gif", "jpeg"],// 上传文件的类型
                fileSize: 5120000000,                // 上传文件的大小
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
                    console.info("此文件上传成功：");
                    console.info(file.name);
                    console.info("此文件上传到服务器地址：");
                    console.log(response);
                    var json = eval("(" + response + ")");
                    if (json.IsOk == "0") {
                        $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">发布失败！</h2><p>" + json.Msg + "</p>")
                        $("#myPopup1").popup('open');
                    } else {
                        i++;
                        $("#myPopup1").html(" <h2 style=\"text-align:center;\">提示</h2><p>你已经成功发布</p>")
                        $("#myPopup1").popup('open');
                        setTimeout(function () {
                            //window.location.href = "RepairList.html";
                        }, 1500);
                    }
                    //$("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");
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

    //} else {
    //    alert('您已经上传了，请耐心等待。。')
    //}

    //$('#xiaoqu').searchableSelect();
});

