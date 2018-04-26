/**
 * Created by jtzh on 2017/9/22.
 */
var svc_own = svcHeader;
$(function () {

    http://localhost:7301/ProjectWeb/sharedService/Ashx_River.ashx?method=getTakePhonesPageList&token=test&riverCode=4132D548-B731-4A2E-9EBE-48FABDB8FAC1&page=1&pageSize=10
        var  token=$.cookie('zzwxToken');
        $.ajax({
        type: "get",
        url: svc_own + "Ashx_River.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getTakePhonesPageList",
            token:token,
            page:1,
            pageSize:9999
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                console.log(result.rows);

                // http://localhost:7301/ProjectWeb/sharedService/Ashx_River.ashx?method=getTakePhonesPageList&token=test&riverCode=4132D548-B731-4A2E-9EBE-48FABDB8FAC1&page=1&pageSize=10




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




    $("#sureBtn").click(function(event) {
        // console.log("222")
        // window.parent.change();
        window.history.back();
    });
});


function click1() {
    // window
}