function run(){
    arrayTest();
    initDom();
}
function arrayTest(){
    var array = [];
    for(var i = 0; i < 10; i++){
        array.push(i);
    }
    //
    var a;
    for(; array.length > 0; ){
        a = array.pop();
    }
}
function CheckElemIsNULL(elem){
    if(!elem)
    return;
    //
    if(!elem.value){
        alert(elem.getAttribute('data-empty'));
        return false;
    }
    return true;
}
function CreateInput(parentElem, id, type, inputatts, labelInnerText, labelatts){
    if(!parentElem)
    return;
    //
    var inputElem = document.createElement("input");
    inputElem.id = id;
    inputElem.type = type;
    if(inputatts && inputatts.length){
        for(var i = 0; i < inputatts.length; i++){
            var attname = inputatts[i].attributeName;
            var attvalue = inputatts[i].attributeValue;
            inputElem.setAttribute(attname, attvalue);
        }
    }
    parentElem.appendChild(inputElem);
    //
    var labelElem = document.createElement("label");
    labelElem.innerText = labelInnerText;
    if(labelatts && labelatts.length){
        for(var i = 0; i < labelatts.length; i++){
            var attname = labelatts[i].attributeName;
            var attvalue = labelatts[i].attributeValue;
            labelElem.setAttribute(attname, attvalue);
        }
    }
    //
    parentElem.insertBefore(labelElem, inputElem);
}
function initDom(){
    var elem = document.createElement("DIV");
    document.body.appendChild(elem);
    //
    var atts = [];
    var att = {
        attributeName: "data-empty",
        attributeValue: "用户名不能为空！"
    };
    atts.push(att);
    var labelatts = [];
    var labelatt = {
        attributeName: "for",
        attributeValue: "username"
    };
    labelatts.push(labelatt);
    CreateInput(elem, "username", "text", atts, "用户名：", labelatts);
    //
    elem = document.createElement("DIV");
    document.body.appendChild(elem);
    //
    atts.length = 0;
    att = {
        attributeName: "data-empty",
        attributeValue: "密码不能为空！"
    }
    atts.push(att);
    //
    labelatts.length = 0;
    labelatt = {
        attributeName: "for",
        attributeValue: "password"
    };
    labelatts.push(labelatt);
    CreateInput(elem, "password", "password", atts, "密码：", labelatts);
    //
    var elemsubmit = document.createElement("button");
    elemsubmit.id = "submit";
    elemsubmit.innerText = "登录";
    document.body.appendChild(elemsubmit);
    //
    $('#submit').click(function(){
    var elem = document.getElementById("username");
    if(!CheckElemIsNULL(elem)){
        elem.focus();
        return;
    }
    var username = elem.value;
    //
    elem = document.getElementById("password");
    if(!CheckElemIsNULL(elem)){
        elem.focus();
        return;
    }
    var password = elem.value;
    //
    //$(this).att("disable", true);
    //
    $.post("/api/login", {"user_id": username, "password": password}, function(json){
       console.log(json);
       if(json.code == "200"){
           alert("登录成功");
       }else{
           alert("登录失败,错误码为：" + json.code + " 错误信息为：" + json.message);
       }
   }).success(function(){/*$(this).att("disable", false);*/})
   .error(function(){/*$(this).att("disable", false);*/})
   .complete(function(){/*$(this).att("disable", false);*/});
   
})
}

