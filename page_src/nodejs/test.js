var fs = require('fs');

var nextfileName = "";
function readFileCallBack(err, data){
    if(err){
        console.log(err);
        return;
    }
    if(data === "done"){
        console.log(nextfileName);
        return;
    }
    //
    nextfileName = data + ".txt";
    fs.readFile(nextfileName, "UTF-8", function(err, data){
        readFileCallBack(err, data);
    });
}
function readFile(){
    nextfileName = "start.txt";
    fs.readFile(nextfileName, "UTF-8", function(err, data){
        readFileCallBack(err, data);
    });
}
readFile();
//
function readFileSync(){
    var nextfileName = "start.txt";
    var data = "";
    while(nextfileName){
        data = fs.readFileSync(nextfileName, "UTF-8");
        if(!data)
        return;
        //
        if(data === "done"){
            console.log(nextfileName);
            break;
        }
        //
        nextfileName = data + ".txt";
    }
}
readFileSync();
//
//未测试
function getText(){
    return new Promise(function(resolve, reject){
        if(nextfileName === "done"){
            console.log(nextfileName);
            resolve();
            return ;
        }
        //
        if(!nextfileName){
            nextfileName = "start.txt";
        }
        fs.readFile(nextfileName, function(err, data){
            if(err){
                reject(err);
            }else{
                if(data !== "done"){
                    nextfileName = data + ".txt";
                }
                resolve(data);
            }
        })
    });
}
getText.then(getText())