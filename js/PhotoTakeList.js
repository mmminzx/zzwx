
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
var arr;
var svcHeader = "http://58.241.38.107:8090/NJXService/Dynamic.svc";

var svc_own = svcHeader;




// $("#photoTakelist").append('<li>'+
//     '<a href="photoTakeDetail.html">'+'<div style="width:100%;">'+'<div style="width: 100%;height: 48px;padding-top: 16px;">'+'<img src="images/头像.png" style="height: 40px;width: 40px;;margin-top: 4px;border-radius: 20px;float: left;"/>'
//     +' <label  style="height: 16px;width: 144px;float: left;text-align: left;font-size: 16px;padding-top: 16px;padding-left: 10px;">'+data.Data[i].name+'</label>'
//     +'</div>'+'<p style="position:relative;line-height: 20px;m;color: #666666;height: 40px;;overflow:hidden;font-size: 12px;">'+data.Data[i].deliveryContent+ '</div>'+'<div style="padding-top: 0;">'+'<img src="images/屏幕快照 2017-08-12 上午9.23.01.png" style="height: 64px;width: 96px;margin-top: 0;margin-left: 5px "/>'+'<img src="images/屏幕快照 2017-08-12 上午9.23.01.png" style="height: 64px;width: 96px;margin-top: 0; margin-left: 5px"/>'+'<p style="color: #666666;font-size: 10px;">'+data.Data[i].createTime+'</p>'+'</div>'+'</a>'+ '</li>');;


$(function () {
    $.ajax({
        url: svc_own +"/appGetPhotoTake?clientID=1"+ "&offset=0&limit=10",
        success: function (data) {
            console.log(data);
            if (data.IsOk == "1") {
                console.log("11");
                $("#thelist").html("");
                for (var i = 0; i < data.Data.length; i++) {

                        $("#photoTakelist").append('<li>'+
                            '<a href="photoTakeDetail.html">'+'<div style="width:100%;">'+'<div style="width: 100%;height: 48px;padding-top: 16px;">'+' <label  style="height: 16px;width: 144px;float: left;text-align: left;font-size: 16px;padding-top: 16px;padding-left: 10px;">'+data.Data[i].name+'</label>'
                            +'</div>'+'<p style="color: #666666;font-size: 10px;">'+data.Data[i].createTime+'</p>'+'</div>'+'</a>'+ '</li>');;

                }
                myScroll.refresh();
            }
            else {
                console.log(data.Msg);
            }

        }








    })

    //
    // for (var i = 0; i < 8; i++) {
    //     $("#photoTakelist").append('<li>'+
    // '<a href="photoTakeDetail.html">'+'<div style="width:100%;">'+'<div style="width: 100%;height: 48px;padding-top: 16px;">'+'<img src="images/头像.png" style="height: 40px;width: 40px;;margin-top: 4px;border-radius: 20px;float: left;"/>'
    // +' <label  style="height: 16px;width: 144px;float: left;text-align: left;font-size: 16px;padding-top: 16px;padding-left: 10px;">'+"赵开发"+'</label>'
    // +'</div>'+'<p style="position:relative;line-height: 20px;m;color: #666666;height: 40px;;overflow:hidden;font-size: 12px;">'+"6月30日上午，省扶贫办刘叶军处长一行深入到翁堵镇扁里村，对扶贫攻坚和建档立卡”回头看“工作进行监督检查和指导，市扶贫办副主任杨建军、县扶贫办主任杨永军和翁堵镇李向成书记、李仲华镇长一同前往检查。"+ '</div>'+'<div style="padding-top: 0;">'+'<img src="images/屏幕快照 2017-08-12 上午9.23.01.png" style="height: 64px;width: 96px;margin-top: 0;margin-left: 5px "/>'+'<img src="images/屏幕快照 2017-08-12 上午9.23.01.png" style="height: 64px;width: 96px;margin-top: 0; margin-left: 5px"/>'+'<p style="color: #666666;font-size: 10px;">'+"2017-6-9"+'</p>'+'</div>'+'</a>'+ '</li>');

    // }

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
            url: svc_own + "/appGetPhotoTake?clientID=1" + "offset=0&limit=10",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    // console.log("11");
                    $("#thelist").html("");
                    for (var i = 0; i < data.Data.length; i++) {
                        $("#photoTakelist").append('<li>'+
                            '<a href="photoTakeDetail.html">'+'<div style="width:100%;">'+'<div style="width: 100%;height: 48px;padding-top: 16px;">'+' <label  style="height: 16px;width: 144px;float: left;text-align: left;font-size: 16px;padding-top: 16px;padding-left: 10px;">'+data.Data[i].name+'</label>'
                            +'</div>'+'<p style="color: #666666;font-size: 10px;">'+data.Data[i].createTime+'</p>'+'</div>'+'</a>'+ '</li>');;

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
            url: svc_own + "/appGetPhotoTake?clientID=1&"+"offset=" + generatedCount+"&limit=10",
            success: function (data) {
                console.log(data);
                if (data.IsOk == "1") {
                    console.log("11");
                    $("#thelist").html("");
                    for (var i = 0; i < data.Data.length; i++) {
                        $("#photoTakelist").append('<li>'+
                            '<a href="photoTakeDetail.html">'+'<div style="width:100%;">'+'<div style="width: 100%;height: 48px;padding-top: 16px;">'+' <label  style="height: 16px;width: 144px;float: left;text-align: left;font-size: 16px;padding-top: 16px;padding-left: 10px;">'+data.Data[i].name+'</label>'
                            +'</div>'+'<p style="color: #666666;font-size: 10px;">'+data.Data[i].createTime+'</p>'+'</div>'+'</a>'+ '</li>');;

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