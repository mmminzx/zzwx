/**
 * Created by jtzh on 2017/8/16.
 */
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 1;

var svcHeader = "http://112.81.63.243/ZZWaterDB/sharedService/";
var svc_own = svcHeader;
var river="../images/river3.png";
var type;
$(function () {
        // //接口
        // var username = $("#username").val();
        // var token = $.cookie("zzwxToken");
    type=getParam("type");
    // console.log("sss"+type);

    var value1 = localStorage["selectedRivers"];

    var Data= JSON.parse(value1)
    console.log(Data);

    var arr=Data.selectedRivers;
            // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_River.ashx?method=getRiverPageList&token=b9813978d9674a60aeb2d8078fc52f28&page=1&pageSize=10

                        // console.log(result.rows);

                        for (var i=0;i<arr.length;i++)
                        {
                            var type;
                            if (arr[i].keyType==null)
                            {
                                type="黑臭河道";

                            }
                            else {
                                type=arr[i].keyType;

                            }
                            $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 135px" onclick="liclick(\''+"OID="+arr[i].OID+"&riverCode="+arr[i].OID+"&riverName="+arr[i].name+'\')">'
                                // +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
                                // +'<img src='+river+' style="width: 100%;height: 100%">'
                                // +'</div>'
                                +'<div style="width: 90%;height: 30vw;margin-left: 10%;">'
                                +'<div style="width: 100%;height: 20px">'
                                +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 15px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #666666;">'+"起点："+arr[i].startPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #666666;">'+"止点："+arr[i].endPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 32px;margin-top: 10px">'
                                +'<p style="padding-top: 0; color:#666666;font-size: 14px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">'+"所涉村："+arr[i].community+'</p>'
                                +'</div>'
                                +'</div>'
                                +'</li>'
                            );


                        }







        //
        // var infoArr=new Array();
        // infoArr[0]={"name":"快鸭港","person":"张志明、周皓","phone":"18082071134","main":"黑臭河道","image":"../images/river.png"}
        // infoArr[1]={"name":"长浜","person":"陈建华","phone":"18013628986","main":"黑臭河道","image":"../images/river1.png"}
        // infoArr[2]={"name":"阳家浜","person":"张志明","phone":"18013628986","main":"黑臭河道","image":"../images/river2.png"}
        // infoArr[3]={"name":"石墩浜","person":"张志明","phone":"18013628986","main":"黑臭河道","image":"../images/river3.png"}
        //
        // for (var i=0;i<4;i++)
        //     {
        //         if (type=="1")
        //         {
        //             $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"1"+'\')">'
        //                 +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //                 +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
        //                 +'</div>'
        //                 +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //                 +'<div style="width: 100%;height: 20px">'
        //                 +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+infoArr[i].name+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 15px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].person+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].phone+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].main+'</label>'
        //                 +'</div>'
        //                 +'</div>'
        //                 +'</li>'
        //             );
        //
        //         }
        //         else if (type=="2")
        //         {
        //             $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"2"+'\')">'
        //                 +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //                 +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
        //                 +'</div>'
        //                 +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //                 +'<div style="width: 100%;height: 20px">'
        //                 +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+infoArr[i].name+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 15px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].person+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].phone+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].main+'</label>'
        //                 +'</div>'
        //                 +'</div>'
        //                 +'</li>'
        //             );
        //
        //         }
        //         else if (type=="3")
        //         {
        //             $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"3"+'\')">'
        //                 +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //                 +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
        //                 +'</div>'
        //                 +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //                 +'<div style="width: 100%;height: 20px">'
        //                 +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+infoArr[i].name+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 15px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].person+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].phone+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].main+'</label>'
        //                 +'</div>'
        //                 +'</div>'
        //                 +'</li>'
        //             );
        //
        //         }
        //         else if (type=="4")
        //         {
        //             $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"4"+'\')">'
        //                 +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
        //                 +'<img src='+infoArr[i].image+' style="width: 100%;height: 100%">'
        //                 +'</div>'
        //                 +'<div style="width: 65%;height: 30vw;margin-left: 35%;">'
        //                 +'<div style="width: 100%;height: 20px">'
        //                 +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+infoArr[i].name+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 15px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].person+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].phone+'</label>'
        //                 +'</div>'
        //                 +'<div style="width: 100%;height: 20px;margin-top: 5px">'
        //                 +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+infoArr[i].main+'</label>'
        //                 +'</div>'
        //                 +'</div>'
        //                 +'</li>'
        //             );
        //
        //         }
        //
        //     }









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
    type=getParam("type");
    if (type==1)
    {
        // console.log(n);
        window.location.href = "NormalReport.html?"+n;

    }
    else if (type=="2")
    {
        window.location.href = "abnormalReported.html?"+n;

    }
    else if (type=="3")
    {
        // console.log(n);
        window.location.href = "suishoupai.html?"+n;

    }
    else if (type=="4")
    {
        window.location.href = "waterQuality.html?riverId="+n;

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
        type=getParam("type");
        console.log(type);
        if (type=="1")
        {
            $.ajax({
                type: "get",
                url: svc_own + "Ashx_River.ashx",
                dataType: 'jsonp',
                jsonp: 'callback',
                data: {
                    method: "getImportantRiverPageList",
                    page:1,
                    pageSize:999
                },
                success: function (result) {
                    console.log(result);
                    if (result.isOK) {
                        // console.log(result.rows);
                        var arr=result.rows;
                        for (var i=0;i<arr.length;i++)
                        {
                            var type;
                            if (arr[i].keyType==null)
                            {
                                type="黑臭河道";

                            }
                            else {
                                type=arr[i].keyType;

                            }
                            $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"riverId="+arr[i].OID+'\')">'
                                // +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
                                // +'<img src='+river+' style="width: 100%;height: 100%">'
                                // +'</div>'
                                +'<div style="width: 90%;height: 30vw;margin-left: 10%;">'
                                +'<div style="width: 100%;height: 20px">'
                                +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 15px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"起点："+arr[i].startPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"止点："+arr[i].endPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"重点治理："+type+'</label>'
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

        }
        else
        {
            // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_River.ashx?method=getRiverPageList&token=b9813978d9674a60aeb2d8078fc52f28&page=1&pageSize=10
            $.ajax({
                type: "get",
                url: svc_own + "Ashx_River.ashx",
                dataType: 'jsonp',
                jsonp: 'callback',
                data: {
                    method: "getRiverPageList",
                    token:"",
                    page:1,
                    pageSize:10
                },
                success: function (result) {
                    console.log(result);
                    if (result.isOK) {
                        // console.log(result.rows);
                        var arr=result.rows;
                        for (var i=0;i<arr.length;i++)
                        {
                            var type;
                            if (arr[i].keyType==null)
                            {
                                type="黑臭河道";

                            }
                            else {
                                type=arr[i].keyType;

                            }
                            $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 135px" onclick="liclick(\''+"OID="+arr[i].OID+"&riverCode="+arr[i].OID+"&riverName="+arr[i].name+'\')">'
                                // +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
                                // +'<img src='+river+' style="width: 100%;height: 100%">'
                                // +'</div>'
                                +'<div style="width: 90%;height: 30vw;margin-left: 10%;">'
                                +'<div style="width: 100%;height: 20px">'
                                +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 15px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #666666;">'+"起点："+arr[i].startPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #666666;">'+"止点："+arr[i].endPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 32px;margin-top: 10px">'
                                +'<p style="padding-top: 0; color:#666666;font-size: 14px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">'+"所涉村："+arr[i].community+'</p>'
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



        }
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
        type=getParam("type");
        console.log(type);
        if (type=="1")
        {
            $.ajax({
                type: "get",
                url: svc_own + "Ashx_River.ashx",
                dataType: 'jsonp',
                jsonp: 'callback',
                data: {
                    method: "getImportantRiverPageList",
                    page:generatedCount,
                    pageSize:999
                },
                success: function (result) {
                    console.log(result);
                    if (result.isOK) {
                        // console.log(result.rows);
                        var arr=result.rows;
                        for (var i=0;i<arr.length;i++)
                        {
                            var type;
                            if (arr[i].keyType==null)
                            {
                                type="黑臭河道";

                            }
                            else {
                                type=arr[i].keyType;

                            }
                            $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 32vw" onclick="liclick(\''+"OID"+arr[i].OID+"&riverCode"+arr[i].riverCode+"&riverName"+arr[i].name+'\')">'
                                // +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
                                // +'<img src='+river+' style="width: 100%;height: 100%">'
                                // +'</div>'
                                +'<div style="width: 90%;height: 30vw;margin-left: 10%;">'
                                +'<div style="width: 100%;height: 20px">'
                                +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 15px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"起点："+arr[i].startPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"止点："+arr[i].endPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #8a8a8a;">'+"重点治理："+type+'</label>'
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

        }
        else
        {
            // http://112.81.63.243/ZZWaterDB/sharedService/Ashx_River.ashx?method=getRiverPageList&token=b9813978d9674a60aeb2d8078fc52f28&page=1&pageSize=10
            $.ajax({
                type: "get",
                url: svc_own + "Ashx_River.ashx",
                dataType: 'jsonp',
                jsonp: 'callback',
                data: {
                    method: "getRiverPageList",
                    token:"",
                    page:generatedCount,
                    pageSize:10
                },
                success: function (result) {
                    console.log(result);
                    if (result.isOK) {
                        // console.log(result.rows);
                        var arr=result.rows;
                        for (var i=0;i<arr.length;i++)
                        {
                            var type;
                            if (arr[i].keyType==null)
                            {
                                type="黑臭河道";

                            }
                            else {
                                type=arr[i].keyType;

                            }
                            $("#thelist").append('<li style="list-style: none;margin: 0 0 20px 0;border-bottom:1px solid #616161;padding-left: 0px;height: 135px" onclick="liclick(\''+"OID="+arr[i].OID+"&riverCode="+arr[i].OID+"&riverName="+arr[i].name+'\')">'
                                // +'<div style="width:30%;height: 25vw;margin:2.5vw 0 0 0;float: left">'
                                // +'<img src='+river+' style="width: 100%;height: 100%">'
                                // +'</div>'
                                +'<div style="width: 90%;height: 30vw;margin-left: 10%;">'
                                +'<div style="width: 100%;height: 20px">'
                                +'<label style="height: 20px;font-size: 20px;color: #3a3a3a;">'+arr[i].name+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 15px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #666666;">'+"起点："+arr[i].startPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 20px;margin-top: 5px">'
                                +'<label style="width: 100%;height: 20px;font-size: 16px;color: #666666;">'+"止点："+arr[i].endPoint+'</label>'
                                +'</div>'
                                +'<div style="width: 100%;height: 32px;margin-top: 10px">'
                                +'<p style="padding-top: 0; color:#666666;font-size: 14px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">'+"所涉村："+arr[i].community+'</p>'
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



        }

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
