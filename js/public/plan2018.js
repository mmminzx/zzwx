/**
 * Created by jtzh on 2017/8/16.
 */
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 1;
    type="1";
var svcHeader = "http://112.81.63.243/ZZWaterDB/sharedService/";
var svc_own = svcHeader;
var plantype=1;
$(function () {
    // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_News.ashx?method=getRiverNewsPageList&page=1&pageSize=10&type=1
        // type1=getParam("type");
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_News.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getRiverNewsPageList",
            page:1,
            pageSize:10,
            type:plantype,
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                console.log(result.rows);
                // callback(result.rows);
                var arr=result.rows;
                for (var i=0;i<arr.length;i++)
                {
                    var url=arr[i].LogoImage;
                    var  imagesStr='<img src="'+arr[i].LogoImage+'" style="width: 100%;height: 100%;margin-left: 5%"/>';
                    $("#elist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+arr[i].Id+'\')">'
                        +'<div  style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
                        +imagesStr
                        +'</div>'
                        +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
                        +'<div style="width: 100%;height: 80px">'
                        +'<label style="height: 20px;font-size: 18px;color: #3a3a3a;">'+arr[i].NewsTitle+'</label>'
                        +'</div>'
                        +'<div style="width: 100%;height: 20px">'
                        +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"发布时间：2017-8-19"+'</label>'
                        +'</div>'
                        +'</div>'

                        +'</div>'

                        +'</li>'
                    );

                }

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
        // console.log("2222"+type);
        // for (var i=0;i<2;i++)
        // {
        //
        //         $("#elist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"1"+'\')">'
        //             +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //             +'<img src="../images/river.png" style="width: 100%;height: 100%">'
        //             +'</div>'
        //             +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //             +'<div style="width: 100%;height: 80px">'
        //             +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+"快鸭港黑臭河问题严重，将主要采取5条治理方案"+'</label>'
        //                 +'</div>'
        //             +'<div style="width: 100%;height: 20px">'
        //             +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"发布时间：2017-8-19"+'</label>'
        //             +'</div>'
        //             +'</div>'
        //
        //             +'</div>'
        //
        //             +'</li>'
        //         );
        //
        //
        //
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
    console.log(n);
    window.location.href="http://112.81.63.243/ZZWaterDB/page/page.htm?ids="+n;

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
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_News.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getRiverNewsPageList",
                page:1,
                pageSize:10,
                type:plantype,
            },
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    console.log(result.rows);
                    // callback(result.rows);
                    var arr=result.rows;
                    $("#elist").html("");
                    for (var i=0;i<arr.length;i++)
                    {
                        var url=arr[i].LogoImage;
                        var  imagesStr='<img src="'+arr[i].LogoImage+'" style="width: 100%;height: 100%;margin-left: 5%"/>';
                        $("#elist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+arr[i].Id+'\')">'
                            +'<div  style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
                            +imagesStr
                            +'</div>'
                            +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
                            +'<div style="width: 100%;height: 80px">'
                            +'<label style="height: 20px;font-size: 18px;color: #3a3a3a;">'+arr[i].NewsTitle+'</label>'
                            +'</div>'
                            +'<div style="width: 100%;height: 20px">'
                            +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"发布时间：2017-8-19"+'</label>'
                            +'</div>'
                            +'</div>'

                            +'</div>'

                            +'</li>'
                        );

                    }

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
        })
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
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_News.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getRiverNewsPageList",
                page:generatedCount,
                pageSize:10,
                type:plantype,
            },
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    console.log(result.rows);
                    // callback(result.rows);
                    var arr=result.rows;

                    for (var i=0;i<arr.length;i++)
                    {
                        var url=arr[i].LogoImage;
                        var  imagesStr='<img src="'+arr[i].LogoImage+'" style="width: 100%;height: 100%;margin-left: 5%"/>';
                        $("#elist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+arr[i].Id+'\')">'
                            +'<div  style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
                            +imagesStr
                            +'</div>'
                            +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
                            +'<div style="width: 100%;height: 80px">'
                            +'<label style="height: 20px;font-size: 18px;color: #3a3a3a;">'+arr[i].NewsTitle+'</label>'
                            +'</div>'
                            +'<div style="width: 100%;height: 20px">'
                            +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"发布时间：2017-8-19"+'</label>'
                            +'</div>'
                            +'</div>'

                            +'</div>'

                            +'</li>'
                        );

                    }

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
        })

        myScroll.refresh(); 	// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}
function changeType(type1) {
    plantype=type1;
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_News.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getRiverNewsPageList",
            page:1,
            pageSize:10,
            type:plantype,
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                console.log(result.rows);
                // callback(result.rows);
                var arr=result.rows;
                $("#elist").html("");
                for (var i=0;i<arr.length;i++)
                {
                    var url=arr[i].LogoImage;
                    var  imagesStr='<img src="'+arr[i].LogoImage+'" style="width: 100%;height: 100%;margin-left: 5%"/>';
                    $("#elist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+arr[i].Id+'\')">'
                        +'<div  style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
                        +imagesStr
                        +'</div>'
                        +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
                        +'<div style="width: 100%;height: 80px">'
                        +'<label style="height: 20px;font-size: 18px;color: #3a3a3a;">'+arr[i].NewsTitle+'</label>'
                        +'</div>'
                        +'<div style="width: 100%;height: 20px">'
                        +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"发布时间：2017-8-19"+'</label>'
                        +'</div>'
                        +'</div>'

                        +'</div>'

                        +'</li>'
                    );

                }

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
    })
    generatedCount = 1;
    myScroll.refresh();
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

// function selected1() {
//
//     var obj = document.getElementById("p1");
//     obj.style.cssText = "border-bottom: 2px solid black;";
//
//     var obj2 = document.getElementById("p2");
//     obj2.style.cssText = "border-bottom: 0px solid black;";
//
//     var obj3 = document.getElementById("p3");
//     obj3.style.cssText = "border-bottom: 0px solid black;";
// }
// function selected2() {
//
//     var obj = document.getElementById("p1");
//     obj.style.cssText = "border-bottom: 0px solid black;";
//
//     var obj2 = document.getElementById("p2");
//     obj2.style.cssText = "border-bottom: 2px solid black;";
//
//     var obj3 = document.getElementById("p3");
//     obj3.style.cssText = "border-bottom: 0px solid black;";
// }
// function selected3() {
//     var obj = document.getElementById("p1");
//     obj.style.cssText = "border-bottom: 0px solid black;";
//
//     var obj2 = document.getElementById("p2");
//     obj2.style.cssText = "border-bottom: 0px solid black;";
//
//     var obj3 = document.getElementById("p3");
//     obj3.style.cssText = "border-bottom: 2px solid black;";
// }
