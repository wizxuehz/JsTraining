function run(){
    arrayTest();
    initDom();
}
function arrayTest(){
    var array = [];
    for(var i = 0; i < 10; i++){
        array.push(i);
        console.log(array[i]);
    }
    //
    var a;
    for(; array.length > 0; ){
        a = array.pop();
        console.log(a);
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
            console.log(attname);
            console.log(attvalue);
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
    elemsubmit.addEventListener("click", function(e){
        var elem = document.getElementById("username");
            if(!CheckElemIsNULL(elem)){
                elem.focus();
                return;
            }
        elem = document.getElementById("password");
            if(!CheckElemIsNULL(elem)){
                elem.focus();
                return;
            }
            alert("开始登录");
        });
}