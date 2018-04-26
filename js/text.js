﻿$(function () {
    var svcHeader = (window.location.protocol ? (window.location.protocol + "//")
		: "")
		+ window.location.host;
    var svc_uoload = svcHeader + "/ZHTQ/Data";
    var SCV_BUS = svcHeader + "/ZHTQService/Business.svc";
    $('#account-info').click(function () {
        $('#account-info-modal').modal()
    })
  
    //初始化FileInput
    //$("#cover").fileinput({
    //    language: 'zh', //设置语言
    //    uploadUrl: svc_uoload + "/phototakeprocessimage.ashx?name=" + $("#name").val() + "&photoContent=" + $("#photoContent").val() + "&IDCard=" + $("#IDCard").val() + "&phone=" + $("#phone").val(),
    //    allowedFileExtensions: ['jpg', 'png', 'gif', 'JPEG'],//接收的文件后缀,
    //    showUpload: true, //是否显示上传按钮
    //    dropZoneEnabled: true,
    //    showCaption: true,//是否显示标题
    //    browseClass: "btn btn-primary", //按钮样式             
    //    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
    //    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
    //    maxImageWidth: 20,
    //    maxFileCount: 4,
    //    resizeImage: true,
    //    resizePreference: 'width',
    //});

    //$('#cover').on('fileuploaded', function (event, data, previewId, index) {
    //    console.log(data);
    //    $("#imageURL").val(data.response.imageURL);
    //    $('#kv-success-box').append(data.response.link);
    //    $('#kv-success-modal').modal('show');
    //})
    $("#cover").fileinput({
        language: 'zh', //设置语言
        uploadUrl: svc_uoload + "/phototakeprocessimage.ashx?name=" + $("#name").val() + "&photoContent=" + $("#photoContent").val() + "&IDCard=" + $("#IDCard").val() + "&phone=" + $("#phone").val(),
        allowedFileExtensions: ["jpg", "png", "gif"],
        maxImageWidth: 2400,
        dropZoneEnabled: true,
        maxImageHeight: 1800,
        resizePreference: 'width',
        maxFileCount: 5,
        resizeImage: true,
    }).on('filepreupload', function () {
        $(".am-close").click();
        $('#kv-success-box').html('');
    }).on('fileuploaded', function (event, data) {
        $('#kv-success-box').append(data.response.link);
        $('#kv-success-modal').modal('show');
       
    });
    $('#submit').click(function () {
        //发布范围
        //var value = "";
        //for (var i = 0; i < range.length; i++) {
        //    if (range[i].checked) { //判断复选框是否选中
        //        value = value + range[i].value + "  "; //值的拼凑 .. 具体处理看你的需要,
        //    }
        //}
        //alert(value);//输出你选中的那些复选框的值
        var title = $("#title").val();
        var type = $("#type").val();
        var peek = $("#peek").val();
        var userID = $.cookie('JTZH_userID');
        var districtID = $.cookie('JTZH_districtID');
        var imageURL = $("#imageURL").val();
        var htmlContent = editor.getContent();
        console.log(title, type, peek, htmlContent, userID, districtID, imageURL);
        if (imageURL == "" || title == "" || type == "" || peek == "" || htmlContent == "") {
            $('#common-alert .modal-title').html('');
            $('#common-alert .modal-title').html('提示');
            $('#common-alert .modal-body').html('');
            $('#common-alert .modal-body').html('信息填写不完全，请检查后重写！');
            $('#common-alert').modal();
        } else {
            $.ajax({
                type: "POST",
                url: SCV_BUS + "/addInformation",
                contentType: "application/json",
                data: '{"title":"' + title +
                    '","type":"' + type +
                    '","peek":"' + peek +
                    '","imageURL":"' + imageURL +
                    '","htmlContent":"' + escape(htmlContent) +
                    '","userID":"' + userID +
                    '","districtID":"' + districtID + '"}',
                dataType: "JSON",
                processData: true,
                success: function (data) {
                    console.log(data);
                    $('#common-alert .modal-title').html('');
                    $('#common-alert .modal-title').html('提示');
                    $('#common-alert .modal-body').html('');
                    $('#common-alert .modal-body').html('您已成功发布信息！请主动关闭本页面,或者等待3秒后自动跳转。。。');
                    $('#common-alert').modal();
                    setTimeout(function () {
                        window.location.href = "BUS_InternalInformation_Z.html";
                    }, 1500);
                }
            })

        }
    })
})
var logout = function () {
    $.cookie("JTZH_userID", null, { path: "/" });
    $.cookie("JTZH_districtID", null, { path: '/' })
    window.location.href = "../login.html";
}