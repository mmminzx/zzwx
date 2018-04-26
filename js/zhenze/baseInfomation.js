/**
 * Created by jtzh on 2017/9/22.
 */
var svc_own = svcHeader;
var bool=true;
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, state.title, state.url);
}
$(function () {
    // $("#addImg").click(function () {
    //     addImg();
    // });
    pushHistory();
    bool=true;
    window.addEventListener("popstate", function(e) {
        if(bool)
        {
            location.href='selectRiver.html';  //在这里指定其返回的地址
        }
        pushHistory();
    }, false);
    var value = localStorage["selectedriverinfo"];
    var Data1= JSON.parse(value)
    console.log(Data1);
    // localStorage.removeItem("publicRiver");
    document.getElementById("name").innerHTML="河道名称："+Data1.name;
    var people=Data1.userNames;
    // var reg = new RegExp(",程华国",",朱建文");
    // console.log(reg);
    people = people.replace(",程华国","");
    people = people.replace(",朱建文","");
    people = people.replace(",范建龙","");
    people = people.replace(",张炳高","");
    if (Data1.code=="wjq30021")
    {
        $("#hezhang1").append('<p  style="color: #333333;font-size: 18px;margin-left: 0px;text-align: left">'+"市级河长：程华国"+'</p>'
            +'<p  style="color: #333333;font-size: 18px;margin-left: 0px;text-align: left">'+"区级河长：朱建文"+'</p>');

    }
    else if (Data1.code=="wjq30051")
    {
        $("#hezhang1").append('<p  style="color: #333333;font-size: 18px;margin-left: 0px;text-align: left">'+"区级河长：范建龙"+'</p>');
    }
    else if (Data1.code=="wjq30072")
    {
        $("#hezhang1").append('<p  style="color: #333333;font-size: 18px;margin-left: 0px;text-align: left">'+"区级河长：张炳高"+'</p>');
    }
    document.getElementById("hezhang").innerHTML="相关负责人："+people;
    if (Data1.length!=null)
    {
        document.getElementById("long").innerHTML="长度: "+Data1.length+"km";
        if (Data1.startPoint!=null)
        {
            document.getElementById("start").innerHTML="起点："+Data1.startPoint;
        }
        else
        {
            document.getElementById("start").innerHTML="起点：无";
        }
        // document.getElementById("start").innerHTML="起点:"+Data1.startPoint;
        if (Data1.endPoint!=null)
        {
            document.getElementById("end").innerHTML="终点："+Data1.endPoint;
        }
        else
        {
            document.getElementById("end").innerHTML="终点:无";
        }
    }
    else
    {
        document.getElementById("long").innerHTML="面积: "+Data1.area+"亩";
        $("#start").remove();
        $("#end").remove();
    }

    document.getElementById("involve").innerHTML="涉及村（社区）："+Data1.community;
    if (Data1.rem!=null)
    {
        document.getElementById("remarks").innerHTML="备注："+Data1.rem;
    }
    else
    {
        document.getElementById("remarks").innerHTML="备注：无";;
    }

    // $.ajax({
    //     type: "get",
    //     url: svc_own + "Ashx_Enterprise.ashx",
    //     dataType: 'jsonp',
    //     jsonp: 'callback',
    //     data: {
    //         method: "getWorkPhotoPageList",
    //         riverCode:Data1.riverCode,
    //         page:1,
    //         pageSize:2,
    //
    //     },
    //     success: function (result) {
    //         console.log(result);
    //         // var arr=result.rows;
    //         var arr=result.rows;
    //         var imagestr="";
    //         var num;
    //         if (arr.length>2)
    //         {
    //             num=2;
    //         }
    //         else
    //         {
    //             num=arr.length;
    //         }
    //         console.log(num)
    //         for (var i=0;i<num;i++)
    //         {
    //
    //             var   strs=arr[i].imgs.split(",");
    //             console.log(strs)
    //
    //             if (strs.length>0)
    //             {
    //
    //
    //                 imagestr=imagestr+'<img src="'+strs[0]+'" style="width: 150px;height: 150px;margin-left: 20px"  style="margin: 0px 0px 0px 10px "/>';
    //                 // imagestr=imagestr+'<img src="'+strs[0]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px"/>';
    //                 // // imagestr=imagestr[jk]+
    //
    //
    //
    //
    //
    //
    //
    //             }
    //
    //         }
    //
    //         console.log(imagestr);
    //         $("#workphoto").append('<div style="width: 90%;margin: 10px 5% 0px 5%">'
    //             // +'<p style="font-size: 18px">'+ content +'</p>'
    //             +'</div>'
    //             +'<div>'
    //             +imagestr
    //             +'</div>'
    //         );
    //
    //
    //
    //     },
    //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //         alert("获取数据失败！");
    //     }
    // });
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_Question.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getReportQuestionPageList",
            riverCode:Data1.riverCode,
            qType:2,
            page:1,
            pageSize:3,

        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                console.log(result.rows);
                // var imgurl="../images/未选择.png";
                var arr=result.rows;

                for (var i=0;i<arr.length;i++)
                {
                    var time=arr[i].reportDate.slice(0,10)
                    var title=arr[i].rTypeName;
                    var ststus="（处理中）";
                    if(arr[i].qStatus==9)
                    {
                        ststus="（已处理）";
                    }
                    // stmp.slice();
                    // <p style="color: #333333;font-size: 18px;margin-left: 0px;text-align: left">2017-8-1 发现水质异常。(已处理)</p>
                    $("#questions").append('<p style="color: #333333;font-size: 18px;margin-left: 0px;text-align: left">'+time+"        "+title+ststus+'</p>'
                    );


                }

                // console.log(imagestr);


            }
            else
            {
                console.log("nono")
                // $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
                // $("#myPopup1").popup('open');

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取数据失败！");
        }
    });
    // $.ajax({
    //     type: "get",
    //     url: svc_own + "Ashx_Question.ashx",
    //     dataType: 'jsonp',
    //     jsonp: 'callback',
    //     data: {
    //         method: "getReportQuestionPageList",
    //         riverCode:Data1.riverCode,
    //         qType:1,
    //         page:1,
    //         pageSize:2,
    //
    //     },
    //     success: function (result) {
    //         console.log(result);
    //         if (result.isOK) {
    //             console.log(result.rows);
    //             // var imgurl="../images/未选择.png";
    //             var arr=result.rows;
    //             var imagestr="";
    //             var num;
    //             if (arr.length>2)
    //             {
    //                 num=2;
    //             }
    //             else
    //             {
    //                 num=arr.length;
    //             }
    //             console.log(num)
    //             for (var i=0;i<num;i++)
    //             {
    //
    //                 var   strs=arr[i].imgs.split(",");
    //                 console.log(strs)
    //
    //                 if (strs.length>0)
    //                 {
    //
    //
    //                     imagestr=imagestr+'<img src="'+strs[0]+'" style="width: 150px;height: 150px;margin-left: 20px"  style="margin: 0px 0px 0px 10px "/>';
    //                     // imagestr=imagestr+'<img src="'+strs[0]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px"/>';
    //                     // // imagestr=imagestr[jk]+
    //
    //
    //
    //
    //
    //
    //
    //                 }
    //
    //             }
    //
    //             console.log(imagestr);
    //             $("#fengguang").append('<div style="width: 90%;margin: 10px 5% 0px 5%">'
    //                 // +'<p style="font-size: 18px">'+ content +'</p>'
    //                 +'</div>'
    //                 +'<div>'
    //                 +imagestr
    //                 +'</div>'
    //             );
    //
    //
    //         }
    //         else
    //         {
    //             console.log("nono")
    //             // $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
    //             // $("#myPopup1").popup('open');
    //
    //         }
    //     },
    //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //         alert("获取数据失败！");
    //     }
    // });
});
