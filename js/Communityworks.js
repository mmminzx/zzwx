/**
 * Created by jtzh on 2017/8/16.
 */
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
var arr;
var svcHeader = "http://58.241.38.107:8090/NJXService/Dynamic.svc";
var imageHeader="http://58.241.38.107:8090/NJXService/Upload/PhotoTake/";


//http://58.241.38.107:8090/NJXService/Upload/PhotoTake/927f1f0b-e69b-479d-b379-a041d746321f.png
var svc_own = svcHeader;
//
// http://58.241.38.107:8090/NJXService/Dynamic.svc/appGetInformation?type={type}&offset={offset}&limit={limit

// }

$(function () {
        $.ajax({
                url: svc_own +"/appGetServicePublic?"+ "offset=0&limit=10",
                success: function (data) {
                    console.log(data);
                    if (data.IsOk == "1") {
                        // console.log("11");
                        $("#works").html("");
                        // data.Data[i].content
                        for (var i = 0; i < data.Data.length; i++) {
                            var  imagesStr="";
                            if (data.Data[i].imageURL.length>1)
                            {

                                imagesStr='<img src="'+imageHeader+data.Data[i].imageURL+'" style="height: 64px;width: 96px;margin-top: 0;margin-left: 5px "/>';
                            }

                            $("#works").append('<li onclick="liclick(\''+data.Data[i].mainText+ '\')"  style="list-style:none;" >'+
                                '<a href="#" >'+'<div style="width: 100%;border-bottom:1px solid #E5E5E5;" >'+
                                '<h2 style="color:#333333">'+data.Data[i].title+'</h2>'+
                                '<p style="padding-top: 0; color:#666666;font-size: 14px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">'+data.Data[i].content+'</p>'
                                +imagesStr+'</a>'+ '</li>');

                        }
                        myScroll.refresh();
                    }
                    else {
                        console.log(data.Msg);
                    }

                }

            }

        )
    }

)

function liclick(str) {

    $.cookie("content",str);
    window.location.href = "NewDetail.html";

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
            url: svc_own + "/appGetInformation?" +"type=3&"+ "offset=0&limit=10",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    // console.log("11");
                    $("#works").html("");
                    for (var i = 0; i < data.Data.length; i++) {
                        var  imagesStr="";
                        if (data.Data[i].imageURL.length>1)
                        {

                            imagesStr='<img src="'+imageHeader+data.Data[i].imageURL+'" style="height: 64px;width: 96px;margin-top: 0;margin-left: 5px "/>';
                        }

                        $("#works").append('<li onclick="liclick(\''+data.Data[i].mainText+ '\')"  style="list-style:none;" >'+
                            '<a href="#" >'+'<div style="width: 100%;border-bottom:1px solid #E5E5E5;" >'+
                            '<h2 style="color:#333333">'+data.Data[i].title+'</h2>'+
                            '<p style="padding-top: 0; color:#666666;font-size: 14px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">'+data.Data[i].content+'</p>'
                            +imagesStr+'</a>'+ '</li>');

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
            url: svc_own + "/appGetInformation?offset="+"type=3&" + generatedCount+"&limit=10",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    console.log("11");
                    $("#thelist").html("");
                    for (var i = 0; i < data.Data.length; i++) {
                        var  imagesStr="";
                        if (data.Data[i].imageURL.length>1)
                        {

                            imagesStr='<img src="'+imageHeader+data.Data[i].imageURL+'" style="height: 64px;width: 96px;margin-top: 0;margin-left: 5px "/>';
                        }

                        $("#works").append('<li onclick="liclick(\''+data.Data[i].mainText+ '\')"  style="list-style:none;" >'+
                            '<a href="#" >'+'<div style="width: 100%;border-bottom:1px solid #E5E5E5;" >'+
                            '<h2 style="color:#333333">'+data.Data[i].title+'</h2>'+
                            '<p style="padding-top: 0; color:#666666;font-size: 14px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">'+data.Data[i].content+'</p>'
                            +imagesStr+'</a>'+ '</li>');

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