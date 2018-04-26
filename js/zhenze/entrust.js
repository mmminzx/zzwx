/**
 * Created by jtzh on 2017/8/16.
 */
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 1;
var statusArr=[];
var svc_own = svcHeader;
var toals=[];
var selectedRivers=[];
var selectype=1;
$(function () {

    // http://localhost:7301/ProjectWeb/sharedService/Ashx_Question.ashx?method=getEntrustPageList&toUser=93EEBF6B-C295-42B9-8F8B-01BDABCC52D1&page=1&pageSize=10
            var type="1";
        var  token=$.cookie('zzwxToken');
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getEntrustPageList",
                fromUser:token,
                page:1,
                pageSize:10
            },
            success: function (result) {
//                console.log(result);
                if (result.isOK) {
                    console.log(result.rows);
                    // var imgurl="../images/未选择.png";
                    $("#thelist").html("");
                    var arr=result.rows;

                    for(var i=0;i<arr.length;i++)
                    {
                        toals.push(arr[i]);
                        var status="待巡查";
                        if (arr[i].status==2)
                        {
                            status="已巡查";

                        }

                        $("#thelist").append( '<li onclick="liclick11(\''+i+'\')" style="list-style: none;margin: 0 0 20px 10px;border-bottom:1px solid #616161;padding-left: 0px;" >'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"委托人员："+arr[i].UserName+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"巡查河流："+arr[i].name+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"委托状态："+status+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+arr[i].entrustDate+'</p>'
                            +'</li>');

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













    }


)
function reload() {
    //method=getReportQuestionPageList&token=test&page=1&pageSize=10&qStatus=0
    var type="1";

    var  token=$.cookie('zzwxToken');
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_Question.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getProcessPageList",
            token:token,
            qStatus:qStatus,
            page:1,
            pageSize:10
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                // console.log(result.rows);
                // var imgurl="../images/未选择.png";
                var arr=result.rows;
                $("#thelist").html("");
                toals.splice(0,toals.length);
                for (var i=0;i<arr.length;i++)
                {
                    toals.push(arr[i]);
                    var reportType="";
                    if (arr[i].qType=="1")
                    {
                        reportType="正常上报";

                    }
                    else {
                        reportType="异常上报";

                    }
                    var questionType="";
                    if (arr[i].rType=="11301")
                    {
                        questionType="工业问题";

                    }
                    else if (arr[i].rType=="11302"){
                        questionType="农业问题";

                    }
                    else if (arr[i].rType=="11303"){
                        questionType="生活污水";

                    }
                    else if (arr[i].rType=="11304"){
                        questionType="涉河违章";

                    }
                    else if (arr[i].rType=="11305"){
                        questionType="河道环境";

                    }
                    else if (arr[i].rType=="11306"){
                        questionType="水质感官异常";

                    }

                    $("#thelist").append('<li onclick="liclick11(\''+i+'\')" style="list-style: none;margin: 0 0 20px 10px;border-bottom:1px solid #616161;padding-left: 0px;" >'
                        +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报类型："+reportType+'</p>'
                        +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"河道名称："+arr[i]['riverName']+'</p>'
                        +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"问题分类："+questionType+'</p>'
                        +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报时间："+arr[i]['reportDate']+'</p>'
                        +'</li>'
                    );
                    //
                    //
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


}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();

    return currentdate;
}
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
//删除指定元素
function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}
function liclick11(n) {
    console.log(selectype);
    if (selectype==2)
    {
        // localStorage.selectedRecord = JSON.stringify(toals[n]);
        // console.log(toals[n])
        // window.location.href="SuperiorPushDetail.html";
        localStorage.selectedentrust = JSON.stringify(toals[n]);
        window.location.href="weituoxuncha.html?type=weituo";
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

        toals.splice(0,toals.length);
        var dic={};
        var  token=$.cookie('zzwxToken');
        if(selectype==1)
        {
            dic={
                method: "getEntrustPageList",
                fromUser:token,
                page:1,
                pageSize:10
            }
        }
        else
        {
            dic={
                method: "getEntrustPageList",
                toUser:token,
                page:1,
                pageSize:10
            }

        }


        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: dic,
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    // console.log(result.rows);
                    // var imgurl="../images/未选择.png";
                    var arr=result.rows;
                    $("#thelist").html("");
                    for (var i=0;i<arr.length;i++)
                    {

                        toals.push(arr[i]);
                        var reportType="";
                        if (arr[i].qType=="1")
                        {
                            reportType="正常上报";

                        }
                        else {
                            reportType="异常上报";

                        }
                        var questionType="";
                        if (arr[i].rType=="11301")
                        {
                            questionType="工业问题";

                        }
                        else if (arr[i].rType=="11302"){
                            questionType="农业问题";

                        }
                        else if (arr[i].rType=="11303"){
                            questionType="生活污水";

                        }
                        else if (arr[i].rType=="11304"){
                            questionType="涉河违章";

                        }
                        else if (arr[i].rType=="11305"){
                            questionType="河道环境";

                        }
                        else if (arr[i].rType=="11306"){
                            questionType="水质感官异常";

                        }

                        $("#thelist").append('<li onclick="liclick11(\''+i+'\')" style="list-style: none;margin: 0 0 20px 10px;border-bottom:1px solid #616161;padding-left: 0px;" >'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报类型："+reportType+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"河道名称："+arr[i]['riverName']+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"问题分类："+questionType+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报时间："+arr[i]['reportDate']+'</p>'
                            +'</li>'
                        );
                        //
                        //
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
        var type="1";
        var  token=$.cookie('zzwxToken');
        var dic={};
        if(selectype==1)
        {
            dic={
                method: "getEntrustPageList",
                fromUser:token,
                page:generatedCount,
                pageSize:10
            }
        }
        else
        {
            dic={
                method: "getEntrustPageList",
                toUser:token,
                page:generatedCount,
                pageSize:10
            }

        }
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_Question.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: dic,
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    // console.log(result.rows);
                    // var imgurl="../images/未选择.png";
                    var arr=result.rows;
                    for (var i=0;i<arr.length;i++)
                    {
                        toals.push(arr[i]);
                        var reportType="";
                        if (arr[i].qType=="1")
                        {
                            reportType="正常上报";

                        }
                        else {
                            reportType="异常上报";

                        }
                        var questionType="";
                        if (arr[i].rType=="11301")
                        {
                            questionType="工业问题";

                        }
                        else if (arr[i].rType=="11302"){
                            questionType="农业问题";

                        }
                        else if (arr[i].rType=="11303"){
                            questionType="生活污水";

                        }
                        else if (arr[i].rType=="11304"){
                            questionType="涉河违章";

                        }
                        else if (arr[i].rType=="11305"){
                            questionType="河道环境";

                        }
                        else if (arr[i].rType=="11306"){
                            questionType="水质感官异常";

                        }
                        $("#thelist").append('<li onclick="liclick11(\''+i+'\')" style="list-style: none;margin: 0 0 20px 10px;border-bottom:1px solid #616161;padding-left: 0px;" >'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报类型："+reportType+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"河道名称："+arr[i]['riverName']+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"问题分类："+questionType+'</p>'
                            +'<p style="color: #333333;font-size: 18px;margin-left: 0px">'+"上报时间："+arr[i]['reportDate']+'</p>'
                            +'</li>'
                        );
                        //
                        //
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
