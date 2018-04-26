/**
 * Created by jtzh on 2017/10/11.
 */
var svc_own = svcHeader;
var imageHeader="http://112.81.63.243/ZZWaterDB/UploadFiles/mobile/";
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
function edit() {
    window.location.href="MyDetailLiangDian.html"
}
$(function () {

    pushHistory();
    bool=true;
    window.addEventListener("popstate", function(e) {
        if(bool)
        {
            location.href='signList.html';  //在这里指定其返回的地址
        }
        pushHistory();

    }, false);

    var value = localStorage["selectedRecord"];
    var Data= JSON.parse(value)
    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Question.ashx?method=/sharedService/Ashx_Question.ashx?method=getQuestionInfo&id=7803EE69-7CCE-443A-B7E7-C3771240B900
    var process;






    // localStorage.removeItem("selectedRecord");
    console.log(Data);
    if (Data.qType=="1")
    {
        $("#change").append(
            '<div id="" style="width: 100%;height: 40px">'
            +'<p style="text-align: center;width: 50px;height: 32px;line-height: 32px;font-size: 16px;color: #bababa;border: 1px solid #bababa; border-radius: 20px;;margin-left: 80%;margin-top: 10px" onclick="edit()">'+'修改'+'</p>'
            +'</div>'
        );
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

        questionType=Data.rTypeName;
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
    var imagestr="";
    if (strs.length>0)
    {
        // imagestr='<img onclick="photoViewer(\''+strs[0]+'\')" src="'+strs[0]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px "/>';
        if(strs.length>0)
        {
            // for (var jk=1;jk<strs.length;jk++)
            // {
            //     imagestr=imagestr+'<br>'+'<img onclick="photoViewer(\''+strs[k=jk]+'\')" src="'+strs[jk]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px " />';
            //
            //
            //
            // }
            for (var k=0;k<strs.length;k++)
            {

                imagesArray.push(strs[k]);
                // imagestr=imagestr +'<div onclick="photoViewer(\''+strs[k]+'\')" src="'+strs[k]+'" style="width:30%;padding-bottom: 30%;height: 0px;;float: left;margin-left: 5px;background-image: url('+strs[k]+');background-size: cover; ">'+'</div>';
                var str1 = strs[k].replace('mobile', 'mobile2');
                imagestr=imagestr +'<div onclick="photoViewer(\''+strs[k]+'\')" style="width: 90px;height: 90px;padding-bottom: 27%;height: 0px;;float: left;margin-left: 5px;background-image: url('+str1+');background-size: cover; ">'+'</div>';



            }

        }

        console.log(imagestr);
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
        +'</div.>'
    );
    if (Data.qStatus=="9")
    {
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getQuestionInfo",
                id:Data.OID
            },
            success: function (result) {
                console.log(result);
                var processarr=result.rows.process;
                if (processarr.length>0)
                {
                    process=processarr[0];
                    // var strs11= new Array(); //定义一数组
                    var  strs11=process.imgs.split(",");
                    // images=strs;
                    console.log(strs11);
                    var imagestr1="";
                    if (strs11.length>0)
                    {

                            for (var k1=0;k1<strs11.length;k1++)
                            {
                                // imagestr1=imagestr1 +'<div onclick="photoViewer(\''+strs11[k1]+'\')" src="'+strs11[k1]+'" style="width:30%;padding-bottom: 30%;height: 0px;;float: left;margin-left: 5px;background-image: url('+strs11[k1]+');background-size: cover; ">'+'</div>';

                                imagesArray.push(strs[k]);
                                var str1 = strs[k].replace('mobile', 'mobile2');
                                imagestr1=imagestr +'<div onclick="photoViewer(\''+strs[k]+'\')" style="width: 90px;height: 90px;padding-bottom: 27%;height: 0px;;float: left;margin-left: 5px;background-image: url('+str1+');background-size: cover; ">'+'</div>';


                            }



                        // console.log(imagestr);
                    }
                    $("#maincontent").append('<p style="vertical-align: middle;text-align: center;;font-size: 18px;margin-left: 0px;text-align: left;height: 30px;color: #000000;background-color: #bababa">'+"  处理结果"+'</p>'
                        +'<div style="width: 90%;margin: 10px 5% 0px 5%">'
                        +'<p style="font-size: 18px">'+process.content+'</p>'
                        +'</div>'
                        +'<div style="width: 84%;height: 120px;;margin-left: 8%">'
                        +imagestr1
                        +'</div.>'
                    );

                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("登录失败！");
            }
        });
        console.log("okk");
        console.log(process);

    }

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