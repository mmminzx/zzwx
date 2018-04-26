var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 1;
var statusArr=[];
var svc_own = svcHeader;
// var svc_own = "http://116.62.175.142/ZZWaterDB/sharedService/";
var toals=[];
var selectedRivers=[];
var selectedType=1;
var images=[];
var bool=true;
var infoArr=[];
var ArrPH=[];
var ArrCOD=[];
var ArrNH3=[];
var ArrTN=[];
var ArrTP=[];
var ArrDate=[];
var MaxCOD=0;
var MaxNH3=0;
var MaxTN=0;
var MaxTP=0;

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
                location.href='basicInformation.html';  //在这里指定其返回的地址
            }
            pushHistory();
        }, false);


        var value = localStorage["selectedriverinfo"];
        var Data1= JSON.parse(value)
        console.log(Data1);
        $.ajax({
            type: "get",
            url: svc_own + "Asxh_WaterQuality.ashx",
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                method: "getWaterQualityList",
                riverCode:Data1.riverCode,
                // riverCode:"392523ED-EF65-4785-9696-96222D807494",
                page:1,
                pageSize:10,
            },
            success: function (result) {
                console.log(result);
                // var arr=result.rows;
                var arr=result.rows;
                infoArr=arr;
                var num=arr.length;

                if (num>0)
                {
                    var Data=arr[0];
                    document.getElementById("time").innerHTML="时间:  "+Data["reportDate"].substring(0,10);
                    document.getElementById("PH").innerHTML=Data["PH"];
                    document.getElementById("COD").innerHTML=Data["COD"];
                    document.getElementById("andan").innerHTML=Data["NH3"];
                    document.getElementById("zonglin").innerHTML=Data["TP"];
                    document.getElementById("zongdan").innerHTML=Data["TN"];

                    for (var k=0;k<arr.length;k++)
                    {
                        ArrCOD.unshift(arr[k]["COD"]);
                        if (MaxCOD<arr[k]["COD"])
                        {
                            MaxCOD=arr[k]["COD"];
                            console.log(MaxCOD);

                        }
                        ArrNH3.unshift(arr[k]["NH3"]);
                        if (MaxNH3<arr[k]["NH3"])
                        {
                            MaxNH3=arr[k]["NH3"];

                        }
                        ArrPH.unshift(arr[k]["PH"]);
                        ArrTN.unshift(arr[k]["TN"]);
                        if (MaxTN<arr[k]["TN"])
                        {
                            MaxTN=arr[k]["TN"];

                        }
                        ArrTP.unshift(arr[k]["TP"]);
                        if (MaxTP<arr[k]["TP"])
                        {
                            MaxTP=arr[k]["TP"];

                        }
                        ArrDate.unshift(arr[k]["reportDate"].substring(0,10));

                    }

                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取数据失败！");
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
function liclick11(n) {

    localStorage.selectedSign = JSON.stringify(toals[n]);
    console.log(toals[n])
    window.location.href="signList.html";





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


