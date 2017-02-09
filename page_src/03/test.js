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
    for(; 0 < array.length; ){
        var a = array.pop();
        console.log(a);
    }
}
function initDom(){
    var elem = document.createElement("DIV");
    elem.id = "testdiv";
    document.body.appendChild(elem);
    //
    var elemLogOn = document.querySelector("#submit");
    if(!elemLogOn)
    return;
    //
    elemLogOn.addEventListener("click", function(e){
            var elem = document.getElementById("username");
            if(!elem)
            return;
            var username = elem.value;
            if(username == undefined || username == null || username == ""){
                alert("用户名为空");
                elem.focus();
                return;
            }
            elem = document.getElementById("password");
            if(!elem)
            return;
            //
            var pwd = elem.value;
            if(pwd == undefined || pwd == null || pwd == ""){
                alert("密码为空");
                elem.focus();
                return;
            }
            alert("开始登录");
        });
}