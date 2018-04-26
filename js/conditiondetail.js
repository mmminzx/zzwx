/**
 * Created by jtzh on 2017/8/30.
 */

var name="";
var cont="";
var imageHeader="http://58.241.38.107:8090/NJXService/Upload/PhotoTake/";
$(function () {

    console.log("2222"+getParam("imagesStr"));
    var imagesStr="";
    if (getParam("imagesStr").length>0)
    {

        var images=getParam("imagesStr").split(",");


        for (var j=0;  j<images.length;j++)
        {

            imagesStr=imagesStr+'<img src="'+imageHeader+images[j]+'" style="height: 64px;width: 96px;margin-top: 0;margin-left: 5px "/>';
        }
    }

    // $("#con").append('<div  style=";widt -height: 20px;m;color: #666666;overflow:hidden;font-size: 12px;margin-top: 10px;">' + "2222" + '</p>' + '</div>').trigger('create');

    $("#con").append('<div  style=";width: 100%;border-bottom:1px solid #E5E5E5;">' +
            '<p style="position:relative;line-height: 20px;m;color: #666666;overflow:hidden;font-size: 12px;margin-top: 10px;">' + getParam("photoContent") + '</p>'
            + '<div >' + imagesStr + '</div>' + '<p style="color: #666666;font-size: 10px;">' + getParam("createTime") + '</p>' + '</div>').trigger('create');
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