document.body.onload = function(){
            document.getElementById("username").focus();
        }
        function CheckValueIsNull(elem){
            if(!elem)
            return;
            //
            if(!elem.value){
                if(elem.hasAttribute("data-empty")){
                    alert(elem.getAttribute("data-empty"));
                }
                return false;
            }
            return true;
        }
        function login(){
            console.log("1");
            var elem = document.getElementById("username");
            if(!CheckValueIsNull(elem)){
                elem.focus();
                return;
            }
            var username = elem.value;
            //
            elem = document.getElementById("password");
            if(!CheckValueIsNull(elem)){
                elem.focus();
                return;
            }
            var password = elem.value;
            console.log("2");
            //
            $('#submit').attr("disabled", true);
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
                    console.log(json);
                    if(json.code == "200"){
                        getAndShowBizGroups(json.token);
                    }else{
                        //$('#loginfailed').innerText = json.message;
                        document.getElementById("loginfailed").innerText = "登录失败，错误：" + json.message;
                    }
                    //
                    $('#submit').attr("disabled", false);
                },
                error: function(){
                    $('#submit').attr("disabled", false);
                }
            });
        }
        $('#submit').click(function(){
            login();
        });
        //
        function getAndShowBizGroups(token){
            var elem = document.getElementById("login");
            if(!elem)
            return;
            //
            elem.style.display = "none";
            //
            elem = document.getElementById("bizGroups");
            if(!elem)
            return;
            //
            elem.style.display = "";
            //
            elem.innerHTML = "";
            //
            var bizGroups = [];
            console.log(!bizGroups);
            var bizlist = [];
            console.log(!bizlist);
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
            console.log(bizlist.length);
            for(var i = 0; i < bizlist.length; i++){
                $('#bizGroups').append(`<div id=${bizlist[i].bizGuid}><h2>${bizlist[i].bizName}</h2></div>`);

            }
            for(var j = 0; j < bizGroups.length; j++){
                var bizguid = `${bizGroups[j].bizGuid}`;
                var elem = $('#' + bizguid).append(`<span>${bizGroups[j].groupName}</span><br/>`);
                if(elem){
                    $('#' + bizguid).show(true);
                }
            }
        }