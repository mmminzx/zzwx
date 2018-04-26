/**
 * Created by jtzh on 2017/8/16.
 */
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
var svcHeader = "http://58.241.38.107:8090/NJXService/Dynamic.svc";
var  str1="周庄镇倪家巷村位于周庄镇西北、定山东麓，全村辖区面积4.38平方公里，东面有世纪大道、北面有芙蓉大道，中间有周山路。东西有光定路、玉门路、白蛇路横贯村庄。西面有3000多亩茂密的山林树木";
var svc_own = svcHeader + "/appGetIntroduction?";

$(function () {
        $.ajax({
            url: svc_own + "/queryOwnerInformation?" + "offset=0&limit=10",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    console.log("11");
                    $("#thelist").html("");
                    for (var i = 0; i < data.Data.length; i++) {



                        $("#thelist").append('<li style="list-style:none;" )">'+
                            '<a href="#">'+'<div style="width: 100%;border-bottom:1px solid #E5E5E5;" onclick="introduceclick(\''+"title="+data.Data[i].districtName+"&content="+data.Data[i].introduction+'\')">'+
                            '<h2 style="color:#333333">'+data.Data[i].districtName+'</h2>'+
                            '<p style="position:relative;color:#666666;font-size: 16px;height: 40px;line-height: 20px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">'+cutString(data.Data[i].introduction,80)+'</p>'
                            +'</a>'+'</div>'+ '</li>');

                    }
                    myScroll.refresh();
                }
                else {
                    console.log(data.Msg);
                }

            }








        })


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
function introduceclick(introduce) {

    window.location.href = "CommunityIntroduceDetail.html?"+introduce;

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
        $.ajax({
            url: svc_own + "/queryOwnerInformation?" + "offset=0&limit=10",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    console.log("11");
                    $("#thelist").html("");
                    for (var i = 0; i < data.Data.length; i++) {
                        $("#thelist").append('<li style="list-style:none;"onclick="introduceclick(\''+data.Data[i]+ '\')">'+
                            '<a href="#">'+'<div style="height: 100px;width: 100%;border-bottom:1px solid #E5E5E5;">'+
                            '<h2 style="color:#333333">'+data.Data[i].districtName+'</h2>'+
                            '<p style="position:relative;line-height:1.4em;color:#666666;height:4.2em;overflow:hidden;font-size: 14px;">'+data.Data[i].introduction+'</p>'
                            +'</a>'+'</div>'+ '</li>');

                    }

                }
                else {
                    console.log(data.Msg);
                }

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
            url: svc_own + "/queryOwnerInformation?offset=" + generatedCount+"&limit=10",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    console.log("11");
                    $("#thelist").html("");
                    for (var i = 0; i < data.Data.length; i++) {
                        $("#thelist").append('<li style="list-style:none;"onclick="introduceclick(\''+data.Data[i]+ '\')">'+
                            '<a href="#">'+'<div style="height: 100px;width: 100%;border-bottom:1px solid #E5E5E5;">'+
                            '<h2 style="color:#333333">'+data.Data[i].districtName+'</h2>'+
                            '<p style="position:relative;line-height:1.4em;color:#666666;height:4.2em;overflow:hidden;font-size: 14px;">'+data.Data[i].introduction+'</p>'
                            +'</a>'+'</div>'+ '</li>');

                    }

                }
                else {
                    console.log(data.Msg);
                }

            }
        })


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
