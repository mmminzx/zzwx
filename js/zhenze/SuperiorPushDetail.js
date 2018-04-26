/**
 * Created by jtzh on 2017/10/11.
 */
var imageHeader="http://112.81.63.243/ZZWaterDB/UploadFiles/mobile/";

var svc_own = svcHeader;
var images=[];
var bool=true;
var imagesArray=[];
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
            location.href='SuperiorPush.html';  //在这里指定其返回的地址
        }
        pushHistory();

    }, false);
    var value = localStorage["selectedRecord"];
    var Data= JSON.parse(value)
    console.log(Data);
    if (Data.qType=="1")
    {
        document.getElementById("reporttype").innerHTML="上报类型：亮点推送";
    }
    else
    {

        document.getElementById("reporttype").innerHTML="上报类型：异常上报";

    }
    document.getElementById("riverName").innerHTML="河道名称："+Data['riverName'];

    var questionType="";
    if (Data.rType=="11301")
    {
        questionType="工业问题";

    }
    else if (Data.rType=="11302"){
        questionType="农业问题";

    }
    else if (Data.rType=="11303"){
        questionType="生活污水";

    }
    else if (Data.rType=="11304"){
        questionType="涉河违章";

    }
    else if (Data.rType=="11305"){
        questionType="河道环境";

    }
    else if (Data.rType=="11306"){
        questionType="水质感官异常";

    }
    else
    {

        questionType=Data.rType;
    }
    document.getElementById("questionType").innerHTML="详细分类："+questionType;
    document.getElementById("reportedData").innerHTML="上报时间："+Data.reportDate;
    var questionstatus="";
    if (Data.qStatus==0)
    {
        questionstatus="未处理";

    }
    else if (Data.qStatus=="9"){
        questionstatus="已处理";

    }
    else if (Data.qStatus=="2"){
        questionstatus="处理中";

    }
    var strs= new Array(); //定义一数组
    strs=Data.imgs.split(",");
    images=strs;
    console.log(strs)
    // var imagestr="";
    // if (strs.length>0)
    // {
    //     imagestr='<img onclick="photoViewer(\''+strs[0]+'\')" src="'+strs[0]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px "/>';
    //     if(strs.length>1)
    //     {
    //         for (var jk=1;jk<strs.length;jk++)
    //         {
    //             imagestr=imagestr+'<img onclick="photoViewer(strs22[jk],strs)" src="'+strs[jk]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px "/>';
    //
    //
    //
    //         }
    //
    //     }
    //
    //     console.log(imagestr);
    // }
    var imagestr="";

    for (var k=0;k<strs.length;k++)
    {
        // imagestr=imagestr +'<div onclick="photoViewer(\''+strs[k]+'\')" src="'+strs[k]+'" style="width:30%;padding-bottom: 30%;height: 0px;;float: left;margin-left: 5px;background-image: url('+strs[k]+');background-size: cover; ">'+'</div>';
        imagesArray.push(strs[k]);
        var str1 = strs[k].replace('mobile', 'mobile2');
        imagestr=imagestr +'<div onclick="photoViewer(\''+strs[k]+'\')" style="width: 90px;height: 90px;padding-bottom: 27%;height: 0px;;float: left;margin-left: 5px;background-image: url('+str1+');background-size: cover; ">'+'</div>';



    }
    if (Data.qType!="1")
    {
        document.getElementById("status").innerHTML="状     态："+questionstatus;

        document.getElementById("Suggesting").innerHTML="处理建议："+Data.processTypeName;
    }
    else
    {
        document.getElementById("status").innerHTML="状     态：已推送";


    }
    // document.getElementById("status").innerHTML="状     态："+questionstatus;
    var content="";
    if (Data.content!=null)
    {

        content=Data.content;
    }
    $("#maincontent").append('<div style="width: 90%;margin: 10px 5% 0px 5%">'
        +'<p style="font-size: 18px">'+ content +'</p>'
        +'</div>'
        +'<div style="width: 84%;height: 120px;;margin-left: 8%">'
        +imagestr
        +'</div>'
    );



    // $.ajax({
    //     type: "get",
    //     url: svc_own + "Ashx_Question.ashx",
    //     dataType: 'jsonp',
    //     jsonp: 'callback',
    //     data: {
    //         method: "getQuestionInfo",
    //         id:Data1.questionCode
    //     },
    //     success: function (result) {
    //         console.log(result);
    //         if (result.isOK) {
    //             console.log(result.rows);
    //             // var imgurl="../images/未选择.png";
    //
    //             var Data= result.rows;
    //             console.log(Data);
    //             if (Data.qType=="1")
    //             {
    //                 document.getElementById("reporttype").innerHTML="上报类型：正常上报";
    //             }
    //             else
    //             {
    //
    //                 document.getElementById("reporttype").innerHTML="上报类型：异常上报";
    //
    //             }
    //             document.getElementById("riverName").innerHTML="河道名称："+Data['riverName'];
    //
    //             var questionType="";
    //             if (Data.rType=="11301")
    //             {
    //                 questionType="工业问题";
    //
    //             }
    //             else if (Data.rType=="11302"){
    //                 questionType="农业问题";
    //
    //             }
    //             else if (Data.rType=="11303"){
    //                 questionType="生活污水";
    //
    //             }
    //             else if (Data.rType=="11304"){
    //                 questionType="涉河违章";
    //
    //             }
    //             else if (Data.rType=="11305"){
    //                 questionType="河道环境";
    //
    //             }
    //             else if (Data.rType=="11306"){
    //                 questionType="水质感官异常";
    //
    //             }
    //             else
    //             {
    //
    //                 questionType=Data.rType;
    //             }
    //             document.getElementById("questionType").innerHTML="问题类型："+questionType;
    //             document.getElementById("reportedData").innerHTML="上报时间："+Data.reportDate;
    //             var questionstatus="";
    //             if (Data.qStatus==0)
    //             {
    //                 questionstatus="未处理";
    //
    //             }
    //             else if (Data.qStatus=="1"){
    //                 questionstatus="已处理";
    //
    //             }
    //             else if (Data.qStatus=="2"){
    //                 questionstatus="处理中";
    //
    //             }
    //             var strs= new Array(); //定义一数组
    //             strs=Data.imgs.split(",");
    //             console.log(strs)
    //             var imagestr="";
    //             if (strs.length>0)
    //             {
    //                 // imagestr=strs[0];
    //                 // for (var jk=0;jk<imagestr.length;jk++)
    //                 // {
    //                 imagestr=imagestr+'<img src="'+strs[0]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px"/>';
    //                 // imagestr=imagestr[jk]+
    //
    //
    //                 // }
    //                 console.log(imagestr);
    //             }
    //             document.getElementById("status").innerHTML="状     态："+questionstatus;
    //             $("#maincontent").append('<div style="width: 90%;margin: 10px 5% 0px 5%">'
    //                 +'<p style="font-size: 18px">'+ Data.content +'</p>'
    //                 +'</div>'
    //                 +'<div>'
    //                 +'<img src="../images/污染图片1.png" style="width: 100%"  style="margin: 0px 0px 0px 10px"/>'
    //                 +'</div>'
    //             );
    //
    //
    //         }
    //         else
    //         {
    //             console.log("nono")
    //             $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
    //             $("#myPopup1").popup('open');
    //
    //         }
    //     },
    //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //         alert("获取数据失败！");
    //     }
    // });


    // if (Data.qType=="1")
    // {
    //     document.getElementById("reporttype").innerHTML="上报类型：正常上报";
    // }
    // else
    // {
    //
    //     document.getElementById("reporttype").innerHTML="上报类型：异常上报";
    //
    // }
    // document.getElementById("riverName").innerHTML="河道名称："+Data['riverName'];
    //
    // var questionType="";
    // if (Data.rType=="11301")
    // {
    //     questionType="工业问题";
    //
    // }
    // else if (Data.rType=="11302"){
    //     questionType="农业问题";
    //
    // }
    // else if (Data.rType=="11303"){
    //     questionType="生活污水";
    //
    // }
    // else if (Data.rType=="11304"){
    //     questionType="涉河违章";
    //
    // }
    // else if (Data.rType=="11305"){
    //     questionType="河道环境";
    //
    // }
    // else if (Data.rType=="11306"){
    //     questionType="水质感官异常";
    //
    // }
    // else
    // {
    //     questionType=Data.rType;
    //
    // }
    // document.getElementById("questionType").innerHTML="问题类型："+questionType;
    // document.getElementById("reportedData").innerHTML="上报时间："+Data.reportDate;
    // var questionstatus="";
    // if (Data.qStatus==0)
    // {
    //     questionstatus="未处理";
    //
    // }
    // else if (Data.qStatus=="1"){
    //     questionstatus="已处理";
    //
    // }
    // else if (Data.qStatus=="2"){
    //     questionstatus="处理中";
    //
    // }
    // // document.getElementById("status").innerHTML="状     态："+questionstatus;
    // var strs= new Array(); //定义一数组
    // // strs=Data.imgs.split(",");
    // // console.log(strs)
    // // var imagestr="";
    // // if (strs.length>0)
    // // {
    // //     // imagestr=strs[0];
    // //     // for (var jk=0;jk<imagestr.length;jk++)
    // //     // {
    // //     imagestr=imagestr+'<img src="'+strs[0]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px"/>';
    // //     // imagestr=imagestr[jk]+
    // //
    // //
    // //     // }
    // //     console.log(imagestr);
    // // }
    // document.getElementById("status").innerHTML="状     态："+questionstatus;
    // $("#maincontent").append('<div style="width: 90%;margin: 10px 5% 0px 5%">'
    //     +'<p style="font-size: 18px">'+ Data.content +'</p>'
    //     +'</div>'
    //     +'<div>'
    //     +'<img src="../images/污染图片1.png" style="width: 100%"  style="margin: 0px 0px 0px 10px"/>'
    //     +'</div>'
    // );
})
function photoViewer(url) {
    if (typeof window.WeixinJSBridge != 'undefined') { //微信图片集查看 WeixinJS
        WeixinJSBridge.invoke('imagePreview', {

            'current': url, //当前地址

            'urls':imagesArray //组

        });
    }
    else
    {
        alert("请在微信中查看");
    }
}