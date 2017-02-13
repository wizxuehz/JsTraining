const hostname = "127.0.0.1";
const port = 80;

var express = require("express");
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/api', proxy({target:'http://note.wiz.cn', changeOrigin:true}));
app.use('/wizas', proxy({target:'http://note.wiz.cn', changeOrigin:true}));

app.use(express.static('05'));
console.log('Web Path: ' + __dirname + '\\04');

app.listen(port, hostname, function(){
    console.log('Server running at http://$(hostname):$(port)');
});