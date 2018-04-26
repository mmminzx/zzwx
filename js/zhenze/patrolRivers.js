/**
 * Created by jtzh on 2017/8/16.
 */
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
var statusArr=[];
var  str1="周庄镇倪家巷村位于周庄镇西北、定山东麓，全村辖区面积4.38平方公里，东面有世纪大道、北面有芙蓉大道，中间有周山路。东西有光定路、玉门路、白蛇路横贯村庄。西面有3000多亩茂密的山林树木";
var svc_own = svcHeader;
var toalRivers=[];
var selectedRivers=[];
$(function () {

    var type="1";
    var  token=$.cookie('zzwxToken');
    $.ajax({
        type: "get",
        url: svc_own + "Ashx_River.ashx",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            method: "getRiverPageList",
            page:1,
            token:token,
            pageSize:10
        },
        success: function (result) {
            console.log(result);
            if (result.isOK) {
                console.log(result.rows);
                var imgurl="../images/未选择.png";
                var arr=result.rows;
                for (var i=0;i<arr.length;i++)
                {
                    toalRivers.push(arr[i]);
                    statusArr.push(0);
                    var id11=(i).toString();
                    var userNames;
                    if (arr[i].userNames==null)
                    {
                        userNames="---";

                    }
                    else {
                        userNames=arr[i].userNames;

                    }
                    $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+i+'\')">'
                        +'<div style="width: 85%;height: 30vw;margin-left: 10%;">'
                        +'<div style="width: 80%;height: 100%;float: left">'
                        +'<div style="width: 100%;height: 20px">'
                        +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
                        +'</div>'
                        +'<div style="width: 100%;height: 20px;margin-top: 15px">'
                        +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"负责人："+userNames+'</label>'
                        +'</div>'
                        +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                        +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"起点："+arr[i].startPoint+'</label>'
                        +'</div>'
                        +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                        +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"止点："+arr[i].endPoint+'</label>'
                        +'</div>'
                        +'</div>'
                        +'<div style="width: 20%;height: 30vw;float: left">'
                        +'<div id="Div' + i + '" style="background-image:url(\''+imgurl+'\');height: 32px;width: 32px;margin-top: 10vw">'
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



    // var infoArr=new Array();
    //     infoArr[0]={"name":"快鸭港","person":"张志明、周皓","phone":"18082071134","main":"黑臭河道","image":"../images/river.png"}
    //     infoArr[1]={"name":"长浜","person":"陈建华","phone":"18013628986","main":"黑臭河道","image":"../images/river1.png"}
    //     infoArr[2]={"name":"阳家浜","person":"张志明","phone":"18013628986","main":"黑臭河道","image":"../images/river2.png"}
    //     var imgurl="../images/未选择.png";
    //     for (var i=0;i<3;i++)
    //     {
    //
    //         statusArr.push(0);
    //             var id11=(i).toString();
    //             // console.log("Div" + i);
    //             $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+i+'\')">'
    //                 +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
    //                 +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
    //                 +'</div>'
    //                 +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
    //                 +'<div style="width: 80%;height: 100%;float: left">'
    //                 +'<div style="width: 100%;height: 20px">'
    //                 +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
    //                 +'</div>'
    //                 +'<div style="width: 100%;height: 20px;margin-top: 15px">'
    //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"负责人：张志明、周皓"+'</label>'
    //                 +'</div>'
    //                 +'<div style="width: 100%;height: 20px;margin-top: 5px">'
    //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"主要治理：黑臭河"+'</label>'
    //                 +'</div>'
    //                 +'</div>'
    //                 +'<div style="width: 20%;height: 30vw;float: left">'
    //                 +'<div id="Div' + i + '" style="background-image:url(\''+imgurl+'\');height: 32px;width: 32px;margin-top: 10vw">'
    //                 +'</div>'
    //                 +'</div>'
    //                 +'</li>'
    //             );
    //
    //
    //
    //
    //
    //     }

    http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Question.ashx?method=addSign&token=test&riverCode=4132D548-B731-4A2E-9EBE-48FABDB8FAC1&startTime=2017-01-01&startAddress=test&endTime=2017-01-01&endAddress=test&coordinate=[31.29954032620578, 120.62441035426534]
    $("#fileSubmit").click(function(event) {


        if (selectedRivers.length==0)
        {
            alert("请选择巡查河流");

        }else
        {

            var type="1";
            var  token=$.cookie('zzwxToken');
            var  riverCode=selectedRivers[0].OID;
            var  rivername=selectedRivers[0].name;
            if (selectedRivers.length>1)
            {
                for (var kk=1;kk<selectedRivers.length;kk++)
                {
                    riverCode=riverCode+","+selectedRivers[kk].OID;
                    rivername=rivername+","+selectedRivers[kk].name;

                }

            }
            if (lon=="")
            {
                alert("获取位置信息失败，请重试");

            }
            else
            {
                var startTime=getNowFormatDate();
                console.log(startTime+"ssss"+lon+","+lat);
                $.ajax({
                    type: "get",
                    url: svc_own + "Ashx_Question.ashx",
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    data: {
                        method: "addSign",
                        token:token,
                        riverCode:riverCode,
                        riverName:rivername,
                        startTime:startTime,
                        startAddress:"",
                        coordinate:"["+lat+","+lon+"]",
                    },
                    success: function (result) {
                        // console.log(result);
                        if (result.isOK) {
                            console.log(result);
                            localStorage.patrolStatus = "1";
                            var riverDic={
                                "selectedRivers":selectedRivers,
                                "signId":result.rows,
                                "signTime":getNowFormatDate()
                            };
                            localStorage.selectedRivers = JSON.stringify(riverDic);
                            window.history.back();return false;

                        }
                        else
                        {
                            console.log("nono")
                            $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">失败！</h2><p>" + result.message + "</p>")
                            $("#myPopup1").popup('open');

                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("失败！");
                    }
                });
                localStorage.selectedRivers = JSON.stringify(riverDic);
                window.history.back();return false;

            }
        }




    });






    }


)
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
function liclick(n) {

    console.log(n+"======"+statusArr[parseInt(n)])

        var imgurl1="../images/未选择.png";
        var imgurl2="../images/选中.png";
        var ids="Div"+n;
        if(statusArr[parseInt(n)]==0)
        {
            if (selectedRivers.length==3)
            {
                alert("最多同时巡查3条河流");

            }
            else {
                selectedRivers.push(toalRivers[n]);
                console.log(selectedRivers);
                statusArr[parseInt(n)]=1;
                var a=document.getElementById(ids);
                a.style.backgroundImage="url("+imgurl2+")";
            }

        }
        else
        {
            removeByValue(selectedRivers,toalRivers[n])
            console.log(selectedRivers);
            statusArr[parseInt(n)]=0;
            var a=document.getElementById(ids);
            a.style.backgroundImage="url("+imgurl1+")";

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
        var  token=$.cookie('zzwxToken');
        toalRivers.splice(0,toalRivers.length);
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_River.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getRiverPageList",
                page:1,
                token:token,
                pageSize:10
            },
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    // console.log(result.rows);
                    var imgurl="../images/未选择.png";
                    var arr=result.rows;

                    $("#thelist").html("");
                    for (var i=0;i<arr.length;i++)
                    {
                        statusArr.push(0);
                        toalRivers.push(arr[i]);
                        var id11=(i).toString();
                        var userNames;
                        if (arr[i].userNames==null)
                        {
                            userNames="---";

                        }
                        else {
                            userNames=arr[i].userNames;

                        }
                        $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+i+'\')">'
                            +'<div style="width: 85%;height: 30vw;margin-left: 10%;">'
                            +'<div style="width: 80%;height: 100%;float: left">'
                            +'<div style="width: 100%;height: 20px">'
                            +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
                            +'</div>'
                            +'<div style="width: 100%;height: 20px;margin-top: 15px">'
                            +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"负责人："+userNames+'</label>'
                            +'</div>'
                            +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                            +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"起点："+arr[i].startPoint+'</label>'
                            +'</div>'
                            +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                            +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"止点："+arr[i].endPoint+'</label>'
                            +'</div>'
                            +'</div>'
                            +'<div style="width: 20%;height: 30vw;float: left">'
                            +'<div id="Div' + i + '" style="background-image:url(\''+imgurl+'\');height: 32px;width: 32px;margin-top: 10vw">'
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
        var  token=$.cookie('zzwxToken');
        $.ajax({
            type: "get",
            url: svc_own + "Ashx_River.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getRiverPageList",
                page:generatedCount,
                token:token,
                pageSize:10
            },
            success: function (result) {
                console.log(result);
                if (result.isOK) {
                    // console.log(result.rows);
                    var imgurl="../images/未选择.png";
                    var arr=result.rows;
                    for (var i=0;i<arr.length;i++)
                    {
                        statusArr.push(0);
                        toalRivers.push(arr[i]);
                        var id11=(i).toString();
                        var userNames;
                        if (arr[i].userNames==null)
                        {
                            userNames="---";

                        }
                        else {
                            userNames=arr[i].userNames;

                        }
                        var yy=i+generatedCount*10;
                        $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+yy+'\')">'
                            +'<div style="width: 85%;height: 30vw;margin-left: 10%;">'
                            +'<div style="width: 80%;height: 100%;float: left">'
                            +'<div style="width: 100%;height: 20px">'
                            +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
                            +'</div>'
                            +'<div style="width: 100%;height: 20px;margin-top: 15px">'
                            +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"负责人："+userNames+'</label>'
                            +'</div>'
                            +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                            +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"起点："+arr[i].startPoint+'</label>'
                            +'</div>'
                            +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                            +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"止点："+arr[i].endPoint+'</label>'
                            +'</div>'
                            +'</div>'
                            +'<div style="width: 20%;height: 30vw;float: left">'
                            +'<div id="Div' + yy + '" style="background-image:url(\''+imgurl+'\');height: 32px;width: 32px;margin-top: 10vw">'
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
