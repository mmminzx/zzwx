/**
 * Created by jtzh on 2017/11/16.
 */
var bool=true;
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, state.title, state.url);
}
$(function () {
    pushHistory();
    window.addEventListener("popstate", function (e) {  //回调函数中实现需要的功能
        setTimeout(function(){
            WeixinJSBridge.call('closeWindow');
        },3000);
        // WeixinJSBridge.call('closeWindow');  //在这里指定其返回的地址

    }, false);
})