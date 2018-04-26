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
    bool=true;
    window.addEventListener("popstate", function(e) {
        if(bool)
        {
            location.href='../Entrance.html';  //在这里指定其返回的地址
        }
        pushHistory();

    }, false);
})