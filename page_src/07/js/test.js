function CheckValueIsNull(elem){
    if(!elem)
    return false;
    //
    if(!elem.value){
        if(elem.hasAttribute("data-empty")){
            console.log("no username");
            alert(elem.getAttribute("data-empty"));
        }
        return false;
    }
    return true;
}
$('#submit').click(function(){
    var elem = document.getElementById("username");
    if(!elem)
    return;
    //
    if(!CheckValueIsNull(elem)){
        elem.focus();
        return;
    }
    var username = elem.value;
    //
    elem = document.getElementById("password");
    if(!elem)
    return;
    //
    if(!CheckValueIsNull(elem)){
        elem.focus();
        return;
    }
    var password = elem.value;
    //
    $(this).attr("disabled", true);
    //开启登录等待动画
    //$('#loading').addclass
    //
    $.ajax({
        url: "/api/login",
        type: "POST",
        data:{
            "user_id": username,
            "password": password
        },
        dataType: "json",
        success: function(json){
            $('#submit').attr("disabled", false);
            //
            if(json.code === "200"){
                $('#login').addClass("hidden");
                getAndShowBizGroups(json.token);
            }else{
                document.getElementById("loginfailed").innerText = "登录失败， 错误：" + json.message;
            }
            //
            
            //$('#loading').
        },
        error: function(){
            $('#submit').attr("disabled", false);
            //$('#loading').
        }
    });
});
function getAndShowBizGroups(token){
    $('#login').attr("display", "none");
    //
    $('#bizgroups').attr("display", "block");
    $('#bizgroups').innerHTML = "";
    //
    var bizGroups = [];
    var bizlist = [];
    //
    $.ajax({
        url: `/wizas/a/groups?api_version=6&token=${token}`,
        dataType: "json",
        success: function(json){
            var groups = json.group_list;
            for(var i = 0; i < groups.length; i++){
                if(!groups[i].bizGuid)
                continue;
                //
                var group = {
                    "groupName": groups[i].kbName,
                    "bizGuid": groups[i].bizGuid
                };
                bizGroups.push(group);
            }
            showBizGroups(bizGroups, bizlist);
        }
    });
                    //
    $.post("/wizas/a/biz/user_bizs?api_version=6&token=" + token, function(data){
        var result = data.result;
        for(var i = 0; i < result.length; i++){
            var biz = {
                "bizGuid": result[i].biz_guid,
                "bizName": result[i].biz_name
            };
            bizlist.push(biz);
        }
        showBizGroups(bizGroups, bizlist);
    });
}

function showBizGroups(bizGroups, bizlist){
    if(!bizGroups.length || !bizlist.length)
    return;
    //
    var elembiz;
    for(var i = 0; i < bizlist.length; i++){
        $('#bizgroups').append(`<div class='biz' id=${bizlist[i].bizGuid}><button class='expand'></button>${bizlist[i].bizName}</br></div>`);

    }
    for(var j = 0; j < bizGroups.length; j++){
        var bizguid = `${bizGroups[j].bizGuid}`;
        var elem = $('#' + bizguid).append(`<div class='group autowidth hidden'> ${bizGroups[j].groupName} </div>`);
        if(elem){
            $('#' + bizguid).show(true);
        }
    }
}
$('#bizgroups').on("click", "button", function(e){
    var expand = false;
    if($(this).hasClass("expand")){
        expand = true;
        $(this).removeClass("expand");
        $(this).addClass("collapse");
    }else{
        $(this).removeClass("collapse");
        $(this).addClass("expand");
    }
    //
    $(this).parent('.biz').find("div.autowidth").each(function(){
        if(expand){
            $(this).removeClass("hidden");
        }else{
            $(this).addClass("hidden");
        }
    });
});