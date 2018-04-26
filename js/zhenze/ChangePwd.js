/**
 * Created by jtzh on 2017/11/7.
 */
var svc_own = svcHeader;
$(function () {
    $("#fileSubmit").click(function(event) {
        var userName=$("#UserName").val();
        var oldPwd=$("#OldPwd").val();
        var NewPwd=$("#NewPwd").val();
        var repeatPwd=$("#repeatPwd").val();
        if (userName!=""&oldPwd!=""&NewPwd!=""&repeatPwd!="")
        {

            if(NewPwd!=repeatPwd)
            {
                console.log(NewPwd,repeatPwd);
                alert("两次密码输入不一致");
            }
            else {
                console.log(oldPwd);
                // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Login.ashx?method=updatePassword&userNo=chenqi&password=888888&newPassword=123456
                $.ajax({
                    type: "get",
                    url: svc_own + "Ashx_Login.ashx?method=updatePassword&userNo="+userName+"&password="+oldPwd+"&newPassword="+NewPwd,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    data: null,
                    success: function (result) {
                        console.log(result);

                        if (result.isOK) {
                            alert("密码更新成功");
                            window.location.href="logIn.html";



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
        }
        else
        {
            alert("请将信息填写完整。");
        }
    })
})