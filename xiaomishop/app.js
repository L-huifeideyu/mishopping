//使用express构建web服务器 --
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const cors = require('cors')
/*引入路由模块*/
const index = require("./routes/index");
const details = require("./routes/details")
const products = require("./routes/products")
const user = require("./routes/user")
const cart = require("./routes/cart")
//const phonelogin = require('./routes/phoneLogin')
var app = express();
app.use(cors({
	origin: ['http://localhost:8080','http://localhost:8081', 'http://localhost:8082','http://127.0.0.1:8020'],
	credentials: true
}))
var server = app.listen(3000);
console.log('服务器已启动，端口3000，正在服务，请操作！！！！')
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
//app.use(express.static('public'));
app.use(express.static('dist'));
/*使用路由器来管理路由*/

app.use(session({
	secret:'128位随机字符串',
	resave:false,
	cookie:{maxAge:60*1000*30},//过期时间ms
	saveUninitialized:true
}))
app.use("/index",index);
app.use("/details",details);
app.use("/products",products);
app.use('/user',user);
app.use("/cart",cart);
//app.use('phonelogin',phonelogin)
//phonelogin();
