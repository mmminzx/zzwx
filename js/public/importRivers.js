/**
 * Created by jtzh on 2017/8/16.
 */
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 1;

var svcHeader = "http://112.81.63.243/ZZWaterDB/sharedService/";

var svc_own = svcHeader;
var page=1;
$(function () {


    //
    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Question.ashx?method=getRiverReportQuestionPageList&riverCode=4132D548-B731-4A2E-9EBE-48FABDB8FAC1&page=1&pageSize=10



    // var riverId="";
    var riverId=getParam("riverId");
    //接口
    // var username = $("#username").val();
    // var token = $.cookie("zzwxToken");
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_Question.ashx?method=getRiverReportQuestionPageList&riverCode="+getParam("riverId")+"&page=1&pageSize=10",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: null,
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                console.log(result.rows);
                var arr=result.rows;
                // thelist
                for(var i=0;i<arr.length;arr++)
                {
                    $("#thelist").append('<li onclick="liclick1()" style="list-style: none;margin: 0 0 20px 10px;border-bottom:1px solid #616161;padding-left: 0px;" >'
                        +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报类型：异常上报"+'</p>'
                        +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"河道名称：快鸭港"+'</p>'
                        +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"主要问题：河道污染严重"+'</p>'
                        +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报时间："+arr[i].reportDate+'</p>'
                        +'</li>'
                    );

                }

            }
            else
            {

                $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                $("#myPopup1").popup('open');

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
    //         method: "getRiverReportQuestionPageList",
    //         riverCode:riverId,
    //         page:1,
    //         pageSize:10
    //     },
    //     success: function (result) {
    //
    //         if (result.isOK) {
    //             console.log(result.rows);
    //             // callback(result.rows);
    //
    //         }
    //         else
    //         {
    //             console.log("nono")
    //             $("#myPopup").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
    //             $("#myPopup").popup('open');
    //
    //         }
    //     },
    //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //         alert("数据获取失败！");
    //     }
    // });



        // var infoArr=new Array();
        //
        // infoArr[0]={"name":"快鸭港","person":"张志明、周皓","phone":"18082071134","main":"黑臭河道","image":"../images/river.png"}
        // infoArr[1]={"name":"长浜","person":"陈建华","phone":"18013628986","main":"黑臭河道","image":"../images/river1.png"}
        // infoArr[2]={"name":"阳家浜","person":"张志明","phone":"18013628986","main":"黑臭河道","image":"../images/river2.png"}
        //
        // for (var i=0;i<3;i++)
        // {
        //     if (type=="1")
        //     {
        //         $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"1"+'\')">'
        //             +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //             +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
        //             +'</div>'
        //             +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //             +'<div style="width: 100%;height: 20px">'
        //             +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+infoArr[i].name+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 15px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].person+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].phone+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].main+'</label>'
        //             +'</div>'
        //             +'</div>'
        //             +'</li>'
        //         );
        //
        //     }
        //     else if (type=="2")
        //     {
        //         $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"2"+'\')">'
        //             +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //             +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
        //             +'</div>'
        //             +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //             +'<div style="width: 100%;height: 20px">'
        //             +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+infoArr[i].name+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 15px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].person+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].phone+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].main+'</label>'
        //             +'</div>'
        //             +'</div>'
        //             +'</li>'
        //         );
        //
        //     }
        //     else if (type=="3")
        //     {
        //         $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"3"+'\')">'
        //             +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //             +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
        //             +'</div>'
        //             +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //             +'<div style="width: 100%;height: 20px">'
        //             +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+infoArr[i].name+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 15px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].person+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].phone+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].main+'</label>'
        //             +'</div>'
        //             +'</div>'
        //             +'</li>'
        //         );
        //
        //     }
        //     else if (type=="4")
        //     {
        //         $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"4"+'\')">'
        //             +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //             +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
        //             +'</div>'
        //             +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //             +'<div style="width: 100%;height: 20px">'
        //             +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+infoArr[i].name+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 15px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].person+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].phone+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].main+'</label>'
        //             +'</div>'
        //             +'</div>'
        //             +'</li>'
        //         );
        //
        //     }
        //     else if (type=="6")
        //     {
        //         $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"6"+'\')">'
        //             +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //             +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
        //             +'</div>'
        //             +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //             +'<div style="width: 100%;height: 20px">'
        //             +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+infoArr[i].name+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 15px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].person+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].phone+'</label>'
        //             +'</div>'
        //             +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].main+'</label>'
        //             +'</div>'
        //             +'</div>'
        //             +'</li>'
        //         );
        //
        //     }
        //
        // }









    }


)
//get请求数据解析     paramName参数名
function getParam(paramName) {
    var paramValue = "";
    var isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        var arrSource = decodeURI(this.location.search).substring(1, this.location.search.length).split("&");


        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}
function liclick(n) {
    if (n=="1")
    {
        window.location.href = "ConventionalReported.html?"+n;

    }
    else if (n=="2")
    {
        window.location.href = "abnormalReported.html?"+n;

    }
    else if (n=="3")
    {
        window.location.href = "basicInformation.html?"+n;

    }
    else if (n=="4")
    {
        window.location.href = "waterQuality.html?"+n;

    }
    else if (n=="6")
    {
        window.location.href = "basicInformation.html?"+n;

    }

}
/**参数说明：

 * 根据长度截取先使用字符串，超长部分追加…

 * str 对象字符串

 * len 目标字节长度

 * 返回值： 处理结果字符串

 */

function cutString(str, len) {

    //length属性读出来的汉字长度为1

    if(str.length*2 <= len) {

        return str;

    }

    var strlen = 0;

    var s = "";

    for(var i = 0;i < str.length; i++) {

        s = s + str.charAt(i);

        if (str.charCodeAt(i) > 128) {

            strlen = strlen + 2;

            if(strlen >= len){

                return s.substring(0,s.length-1) + "...";

            }

        } else {

            strlen = strlen + 1;

            if(strlen >= len){

                return s.substring(0,s.length-2) + "...";

            }

        }

    }

    return s;

}
/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullDownAction() {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        //var el, li, i;
        //el = document.getElementById('thelist');

        //for (i = 0; i < 3; i++) {
        //    li = document.createElement('li');
        //    li.innerText = 'Generated row ' + (++generatedCount);
        //    el.insertBefore(li, el.childNodes[0]);
        //}
        var riverId=getParam("riverId");
        //接口
        // var username = $("#username").val();
        // var token = $.cookie("zzwxToken");
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx?method=getRiverReportQuestionPageList&riverCode="+getParam("riverId")+"&page=1&pageSize=10",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: null,
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    console.log(result.rows);
                    var arr=result.rows;
                    // thelist
                    for(var i=0;i<arr.length;arr++)
                    {
                        $("#thelist").append('<li onclick="liclick1()" style="list-style: none;margin: 0 0 20px 10px;border-bottom:1px solid #616161;padding-left: 0px;" >'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报类型：异常上报"+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"河道名称：快鸭港"+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"主要问题：河道污染严重"+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报时间："+arr[i].reportDate+'</p>'
                            +'</li>'
                        );

                    }

                }
                else
                {

                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                    $("#myPopup1").popup('open');

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取数据失败！");
            }
        });
        generatedCount = 1;
        myScroll.refresh(); 	//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction() {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        generatedCount += 1;
        var riverId=getParam("riverId");
        //接口
        // var username = $("#username").val();
        // var token = $.cookie("zzwxToken");
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx?method=getRiverReportQuestionPageList&riverCode="+getParam("riverId")+"&page="+generatedCount+"&pageSize=10",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: null,
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    console.log(result.rows);
                    var arr=result.rows;
                    // thelist
                    for(var i=0;i<arr.length;arr++)
                    {
                        $("#thelist").append('<li onclick="liclick1()" style="list-style: none;margin: 0 0 20px 10px;border-bottom:1px solid #616161;padding-left: 0px;" >'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报类型：异常上报"+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"河道名称：快鸭港"+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"主要问题：河道污染严重"+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报时间："+arr[i].reportDate+'</p>'
                            +'</li>'
                        );

                    }

                }
                else
                {

                    $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                    $("#myPopup1").popup('open');

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取数据失败！");
            }
        });


        //var el, li, i;
        //el = document.getElementById('thelist');

        //for (i = 0; i < 3; i++) {
        //    li = document.createElement('li');
        //    li.innerText = 'Generated row ' + (++generatedCount);
        //    el.appendChild(li, el.childNodes[0]);
        //}

        myScroll.refresh(); 	// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 初始化iScroll控件
 */
function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        scrollbarClass: 'myScrollbar', /* 重要样式 */
        useTransition: false, /* 此属性不知用意，本人从true改为false */
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                pullDownAction(); // Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction(); // Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);
