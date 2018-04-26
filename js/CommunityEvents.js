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
var svc_own = svcHeader;
//
// http://58.241.38.107:8090/NJXService/Dynamic.svc/appGetActivity?clientID={clientID}&offset={offset}&limit={limit}&isMine={isMine

$(function () {
        $.ajax({
            url: svc_own +"/appGetActivity?"+ "clientID=1&offset=0&limit=10&isMine=0",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    console.log("11");
                    $("#thelist").html("");
                    for (var i = 0; i < data.Data.length; i++) {


                        $("#thelist").append('<li style="list-style:none;">'+
                            '<a >'+'<div style="width: 100%;border-bottom:1px solid #E5E5E5;">'+
                            '<h2 style="color:#333333">'+data.Data[i].title+'</h2>'+
                            '<p style="position:relative;line-height:1.4em;color:#666666;height:4.2em;overflow:hidden;font-size: 14px;">'+data.Data[i].peek+'</p>'
                            +'</a>'+imagesStr+'</div>'+ '</li>');

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
function clickAction(content) {
    console.log(content);
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
            url: svc_own + "/appGetActivity?" +"clientID=1&"+ "offset=0&limit=10&isMine=0",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    console.log("11");
                    $("#thelist").html("");
                    for (var i = 0; i < data.Data.length; i++) {
                        $("#thelist").append('<li style="list-style:none;">'+
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
            url: svc_own + "/appGetActivity?clientID=1&"+"offset=" + generatedCount+"&limit=10&isMine=0",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    console.log("11");
                    $("#thelist").html("");
                    for (var i = 0; i < data.Data.length; i++) {
                        $("#thelist").append('<li style="list-style:none;">'+
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