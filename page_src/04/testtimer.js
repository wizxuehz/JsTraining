var t;
var intervalCallback;
var intervalmillisec;

function interval(){
    if(!intervalCallback)
    return;
    //
    if(!intervalCallback()){
        clearTimeout(t);
        return;
    }
    t = setTimeout("interval()", intervalmillisec);
}
function setTimer(callback, millisec){
    callback();
    return 
}
//
function testInterval(){
    var counter = 0;
    var interval = setTimer(function(){
        console.log(new Date().valueOf());
        counter++;
        if(counter > 100)
        return false;

        //
        (function(){
            var i, j, k;
            for(i = 0; i < 99999; i++){
                for(j = 0; j < 39999; j++){
                    k = i * j;
                }
            }
        })()
        //
        console.log(new Date().valueOf() + ' -- timer ' + counter + ' over.' );
        return true;
    }, 1000);
}