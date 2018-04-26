/**
 * Created by jtzh on 2017/10/25.
 */
var svc_own = svcHeader;
function pushHistory() {
    var state = {
        title: "title",
        url: "__SELF__"
    };
    window.history.pushState(state, state.title, state.url);
}
$(function () {
    pushHistory();

    window.addEventListener("popstate", function(e) {  //回调函数中实现需要的功能
        location.href='logIn.html';  //在这里指定其返回的地址
    }, false);


    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Question.ashx?method=getFollowNoRead&token=74220137-48B9-4AB7-A119-DAB07929B990
    var  token=$.cookie('zzwxToken');
    console.log(token);
    if (token)
    {
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getFollowNoRead",
                token:token
            },
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    console.log(result.rows);


                    var arr=result.rows;
                    if (result.total>0)
                    {
                        var obj2 = document.getElementById("tishi");
                        obj2.style.cssText = "top: 198px;left: 33%;height: 30px; width:30px; background:red; position:absolute; z-index:3;border-radius:15px;line-height:30px;color: white;display:block";
                        obj2.innerHTML = result.total;
                    }


                }
                else
                {
                    // console.log("nono")
                    // $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
                    // $("#myPopup1").popup('open');

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取数据失败！");
            }
        });
    }
    else
    {
        window.location.href="logIn.html";

    }

})