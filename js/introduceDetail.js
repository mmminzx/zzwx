/**
 * Created by jtzh on 2017/8/30.
 */

var name="";
var cont="";
$(function () {
    load();
    console.log("nn"+name+cont);

    $("#con").append('<label style=" font-size: 25px;width: 100%;text-align: center">'+name+'</label>'+'<p style="padding: 10px 10px 10px 10px;font-size: 16px">'+cont+'</p>');
})

function load() {
    name=getParam("title");
    cont=getParam("content");
    console.log(name);

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