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
            var username = document.getElementById("username").value;
            if(username == undefined || username == null || username == ""){
                alert("用户名为空");
                return;
            }
            var pwd = document.getElementById("password").value;
            if(pwd == undefined || pwd == null || pwd == ""){
                alert("密码为空");
                return;
            }
            alert("开始登录");
        });
}