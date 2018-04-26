var isremember=1;

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function toSignIn() {
    var toArr = getUrlParam('Arrow');
    window.location.href = "zhuce.html?Arrow=" + toArr;
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

    window.addEventListener("popstate", function(e) {
        if(bool)
        {
            location.href='../Entrance.html';  //在这里指定其返回的地址
        }
    }, false);

    var svc_own = svcHeader;





    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Question.ashx?method=/sharedService/Ashx_Question.ashx?method=getQuestionInfo&id=7803EE69-7CCE-443A-B7E7-C3771240B900
    c_start=document.cookie.indexOf("zzwxToken");
    // console.log($.cookie('zzwxusername'));

    // console.log(c_start);
    if ($.cookie('zzwxusername')!="null"&&$.cookie('zzwxusername')!=undefined)
    {
        // console.log("asda");
        document.getElementById("username").value=$.cookie('zzwxusername');
        document.getElementById("pwd").value=$.cookie('zzwxpwd');
    }
    // $.cookie('zzwxusername', username);
    // $.cookie('zzwxpwd', pwd);


   //  if($.cookie('zzwxToken')==null||$.cookie('zzwxToken')==""){
   //      console.log("nnnn");
   //
   //
   // }
   //  else
   //  {
   //      window.location.href="Home.html";
   //
   //  }


        // $.ajax({
        //     type : "get",
        //     async : false,
        //     url : svc_own + "Ashx_Login.ashx", //实际上访问时产生的地址为: ajax.ashx?callbackfun=jsonpCallback&id=10
        //     data : {"method": "login", "userNo": username, "password": pwd},
        //     cache : false, //默认值true
        //     dataType : "jsonp",
        //     jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //     jsonpCallback:"jsonpCallback",
        //     //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //     //如果这里自定了jsonp的回调函数，则success函数则不起作用;否则success将起作用
        //     success : function(json){
        //         // var item=eval("("+json+")");
        //         console.log(json);
        //     },
        //     error:function(){
        //         alert("erroe");
        //     }
        // });

    // })


    $("#btn_submit").click(function () {
        // window.location.href = "Home.html";
        var username = $("#username").val();
        var pwd = $("#pwd").val();

        if (username == '' || pwd == '') {
            bool=false;
            setTimeout(function(){
                $("#myPopup").popup('close');
                bool=true;
            },3000);
            // $("#myPopup").html("<a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">操作失败！</h2><p>请输入登录名和密码！</p>")
            // $("#myPopup").popup('open');
            alert("请输入登录名和密码！");
        } else {
            var username = $("#username").val();
            var pwd = $("#pwd").val();
            $.ajax({
                type: "get",
                url: svc_own + "Ashx_Login.ashx",
                dataType: 'jsonp',
                jsonp: 'callback',
                data: {
                    method: "login",
                    userNo:username,
                    password:pwd
                },
                success: function (result) {

                    if (result.isOK) {

                        // console.log(result.rows);
                        // console.log(result.rows.RolesCode);
                        if(isremember==1)
                        {
                            $.cookie('zzwxusername', username);
                            $.cookie('zzwxpwd', pwd);
                            $.cookie('RolesCode', result.rows.RolesCode);
                        }
                         else
                        {
                            $.cookie('zzwxusername', null);
                            $.cookie('zzwxpwd', null);
                            $.cookie('RolesCode', null);
                        }

                        callback(result.rows);

                    }
                    else
                    {
                        // console.log("nono")
                        $.cookie('zzwxusername', null);
                        $.cookie('zzwxpwd', null);
                        bool=false;
                        setTimeout(function(){
                            // $("#myPopup1").popup("close");
                            $("#myPopup").popup('close');
                            bool=true;
                        },3000);
                        // $("#myPopup").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">登录失败！</h2><p>" + result.message + "</p>")
                        // $("#myPopup").popup('open');
                        alert(result.message);


                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("登录失败！");
                }
            });

        }
    })
    // $('#changePassword').click(function () {
    //     window.location.href = "ChangePwd.html";
    // })
    // $('#pwd').bind('input propertychange', function() {inputaction();});
})
function changepwd() {
    window.location.href = "ChangePwd.html";
}
function inputaction() {
    // console.log("1");
    $('#pwd').focus;
}
function callback(data) {
    $.cookie('zzwxToken', data.token, { expires: 1 });
    $.cookie('zzwxUserName', data.UserName, { expires: 1 });
    window.location.href="Home.html";
}