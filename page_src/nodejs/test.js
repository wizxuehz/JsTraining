var fs = require('fs');
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var helper = function (fn) {
  return function () {
    var args = [].slice.call(arguments);
    var pass;
    args.push(function () { // 在回调函数中植入收集逻辑
      if (pass) {
        pass.apply(null, arguments);
      }
    });
    fn.apply(null, args);

    return function (fn) { // 传入一个收集函数
      pass = fn;
    };
  };
};
var readfile = helper(fs.readFile);
/*function readfile(filename){
    return function(callback){
        fs.readFile(filename, "utf8", function(err, data){
            callback(null, data);
        });
    }
}*/
//
var readfiles = function* (filename){
    var txt = yield readfile(filename);
    var txt2 = yield readfile(txt);
    var txt3 = yield readfile(txt2);
    var txt4 = yield readfile(txt3);
}
//

function readFileStepByStep(){
    //var generator = readfiles();
    var generator = readfiles("start.txt");
    var ret = generator.next();
    var result = null;
    if(ret.done)
    return;
    //
    ret.value(function(err, data){
        result = data.toString();
        console.log(result);
        //
        ret = generator.next(result);
        if(ret.done)
        return;
        //
        ret.value(function(err, data){
           result = data.toString();
           console.log(result);
            //
            ret = generator.next(result);
            if(ret.done)
            return;
            //
            ret.value(function(err, data){
                result = data.toString();
                console.log(result);
                //
                ret = generator.next(result);
                if(ret.done)
                return;
                //
                ret.value(function(err, data){
                    result = data.toString();
                    console.log(result);
                    //
                    ret = generator.next(result);
                    if(ret.done)
                    return;
                });
            });
        });
    });
}
//readFileStepByStep();


function autoReadFiles(){
    var generator = readfiles("start.txt");
    var ret = null;
    var result = null;
    //
    function test(result){
        ret = generator.next(result);
        if(ret.done)
        return;
        //
        ret.value(function(err, data){
            result = data.toString();
            console.log(result);
            test(result);
        });
    }
    //
    test(null);
}
autoReadFiles();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    fs.readFile(nextfileName, "UTF-8", readFileCallBack);
}
function readFile(){
    nextfileName = "start.txt";
    fs.readFile(nextfileName, "UTF-8", readFileCallBack);
}
//readFile();
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
//readFileSync();
//
//getText 定义api, 只读内容， 不对数据做处理
function getText(){
    return new Promise(function(resolve, reject){
        fs.readFile("start.txt", "UTF-8", function(err, data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    });
}
/*getText().then(function(data){
    console.log(data);
}).catch(function(){
    console.log(data);
})*/
