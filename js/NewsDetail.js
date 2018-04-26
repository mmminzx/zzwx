/**
 * Created by jtzh on 2017/8/17.
 */
$(function () {

    // onclick="introduceclick(\''+"photoContent="+data.Data[i].photoContent+"&imagesStr="+imagesStr+"&createTime="+data.Data[i].createTime+'\'
    $("#conditions").append('<li style="list-style:none;" )>'+'<div  style=";width: 100%;border-bottom:1px solid #E5E5E5;">'+
        '<p style="position:relative;line-height: 20px;m;color: #666666;overflow:hidden;font-size: 12px;margin-top: 10px;">'+getParam(photoContent)+'</p>'
        +'<div >'+get(imagesStr)+'</div>'+'<p style="color: #666666;font-size: 10px;">'+getParam(createTime)+'</p>'+'</div>'+ '</li>');


})

