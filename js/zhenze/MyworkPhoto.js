/**
 * Created by jtzh on 2017/10/11.
 */
var imageHeader="http://112.81.63.243/ZZWaterDB/UploadFiles/mobile/";
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
            location.href='signList.html';  //在这里指定其返回的地址
        }
        pushHistory();

    }, false);
    var value = localStorage["selectedRecord"];
    var Data= JSON.parse(value)
    localStorage.removeItem("selectedRecord");
    console.log(Data);

    document.getElementById("riverName").innerHTML="河道名称："+Data['riverName'];

    if (Data['content']!=null)
    {
        document.getElementById("questionType").innerHTML="参与人员："+Data['content'];
    }

    document.getElementById("reportedData").innerHTML="上报时间："+Data.reportDate;
    var questionstatus="";

    var strs= new Array(); //定义一数组
    strs=Data.imgs.split(",");
    console.log(strs)
    // var imagestr="";
    // if (strs.length>0)
    // {
    //     imagestr='<img src="'+strs[0]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px "/>';
    //     if(strs.length>1)
    //     {
    //         for (var jk=1;jk<strs.length;jk++)
    //         {
    //             imagestr=imagestr+'<img src="'+strs[jk]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px "/>';
    //             // imagestr=imagestr+'<img src="'+strs[0]+'" style="width: 100%"  style="margin: 0px 0px 0px 10px"/>';
    //             // // imagestr=imagestr[jk]+
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

    // document.getElementById("status").innerHTML="状     态："+questionstatus;
    // var content="";
    // if (Data.content!=null)
    // {
    //
    //     content=Data.content;
    // }
    $("#maincontent").append('<div style="width: 90%;margin: 10px 5% 0px 5%">'
        // +'<p style="font-size: 18px">'+ content +'</p>'
        +'</div>'
        +'<div style="width: 84%;height: 120px;;margin-left: 8%">'
        +imagestr
        +'</div>'
    );
})
function photoViewer(url) {

    WeixinJSBridge.invoke('imagePreview', {

        'current': url, //当前地址

        'urls':imagesArray //组

    });

}