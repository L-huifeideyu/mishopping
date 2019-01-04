var https = require('https');
var qs = require('querystring');
//var express = require('express')
//var router = express.Router();
var apikey = '7b63f8dbf59db01d372c791637ffa6ac';
var mobile = '18845049775';
var codeArr = [];
for(var i = 0 ;i < 6 ;i ++)
{
	codeArr.push(Math.ceil(Math.random()*9))
}
var code = codeArr.join('');
console.log(code)
var text = `【米商城】您的验证码是${code}。如非本人操作，请忽略本短信`;  //注意这里固定格式【此处为后台设置的签名】


//这里我们不需要自定义模板和语音验证，国际和国内请求的短信验证是同一个url
//嫌麻烦的话这里可以直接定义为一个url
var sms_host = 'sms.yunpian.com';  //请求地址的url
send_sms_uri = '/v2/sms/single_send.json';  //请求地址的url

//调用发送验证码，参数请求地址、apikey、手机号、自定义模板内容
send_sms(send_sms_uri,apikey,mobile,text);

//send_sms方法
function send_sms(uri,apikey,mobile,text){
    var post_data = {  
    'apikey': apikey,  
    'mobile':mobile,
    'text':text,
    }; 
    var content = qs.stringify(post_data);  
    //把发送的数据解析为字符串发送
    post(uri,content,sms_host);
}

function post(uri,content,host){
    var options = {  
        hostname: host,
        port: 443,  
        path: uri,  
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
        }  
    };
    var req = https.request(options, function (res) {  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk + code);  
        });  
    }); 
    req.write(content);  
    req.end();   
}
