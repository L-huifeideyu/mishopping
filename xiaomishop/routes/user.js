const express = require('express')
const pool = require('../pool')

const router = express.Router();
router.post("/login", (req, res) => {
	var user_name = req.body.user_name;
	var upwd = req.body.upwd;
	var uname = /^([A-Za-z0-9_\-\u4e00-\u9fa5]{6,20})$/
	var phone = /^((\+86|0086)?\s*1[3-8]\d{9})$/
	var email = /^(\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14})$/
	var sql = '';
	if(phone.test(user_name)) {
		sql = "SELECT uid FROM m_user WHERE phone = ? AND upwd = ?"
	}
	else if(email.test(user_name)) {
		sql = "SELECT uid FROM m_user WHERE email = ? AND upwd = ?"
	}
	else {
		sql = "SELECT uid FROM m_user WHERE uname = ? AND upwd = ?"
	}

	pool.query(sql, [user_name, upwd], (err, result) => {
		if(err) throw err
		if(result.length > 0) {
			req.session.uid = result[0].uid
			
			res.send(JSON.stringify({ state: 'ok' }))
		}
		else {
			res.send(JSON.stringify({ state: 'no' }))
		}
	})
})
router.post('/phoneLogin',(req,res)=>{
	var phone = req.body.phone;
	//console.log(uname)
	var sql = "SELECT uid FROM m_user WHERE phone = ?"
	pool.query(sql, phone, (err, result) => {
		if(err) throw err;
		if(result.length > 0) {
			req.session.uid = result[0].uid
			res.send(JSON.stringify({ state: 'ok' }))
		}
		else {
			res.send(JSON.stringify({ state: 'no' }))
		}
	})
})
router.post("/register", (req, res) => {
	var uname = req.body.uname;
	var upwd = req.body.upwd;
	var phone = req.body.phone;
	var email = req.body.email;
	var sql = "INSERT INTO m_user (uname,upwd,phone,email) VALUES(?,?,?,?)";
	pool.query(sql, [uname, upwd, phone, email], (err, result) => {
		if(err) throw err;
		res.send(JSON.stringify({ state: 'ok' }))
	})
})
router.post("/selectUname", (req, res) => {
	var uname = req.body.uname;
	//console.log(uname)
	var sql = "SELECT uid FROM m_user WHERE uname = ?"
	pool.query(sql, uname, (err, result) => {
		if(err) throw err;
		if(result.length > 0) {
			res.send(JSON.stringify({ state: 'ok' }))
		}
		else {
			res.send(JSON.stringify({ state: 'no' }))
		}
	})
})
router.post("/selectPhone", (req, res) => {
	var phone = req.body.phone;
	//console.log(uname)
	var sql = "SELECT uid FROM m_user WHERE phone = ?"
	pool.query(sql, phone, (err, result) => {
		if(err) throw err;
		if(result.length > 0) {
			res.send(JSON.stringify({ state: 'ok' }))
		}
		else {
			res.send(JSON.stringify({ state: 'no' }))
		}
	})
})
//手机短信验证登陆
router.post("/selectEmail", (req, res) => {
	var email = req.body.email;
	//console.log(uname)
	var sql = "SELECT uid FROM m_user WHERE email = ?"
	pool.query(sql, email, (err, result) => {
		if(err) throw err;
		if(result.length > 0) {
			res.send(JSON.stringify({ state: 'ok' }))
		}
		else {
			res.send(JSON.stringify({ state: 'no' }))
		}
	})
})
router.get("/islogin",(req,res)=>{
  var uid=req.session.uid
  
  if(uid==null){
    res.write(JSON.stringify({state:'no'}));
    res.end();
  }else{
    var sql="select uname,uid from m_user where uid=?";
    pool.query(sql,[uid],(err,result)=>{
      res.write(JSON.stringify({state:'ok',uname:result[0].uname,uid:result[0].uid}));
      res.end();
    })
  }
})
router.get("/loginout",(req,res)=>{
  delete req.session.uid;
  res.send();
})
router.post('/selectSelfInfo',(req,res)=>{
	var uid = req.body.uid;
	var sql = 'SELECT * FROM m_user WHERE uid= ?'
	pool.query(sql,[uid],(err,result)=>{
		if(err) throw err
		if(result.length>0)
		{
			res.send(JSON.stringify(result[0]))
		}
	});
})
router.post('/update',(req,res)=>{
	
	var uname = req.body.uname
	var phone = req.body.phone
	var email = req.body.email
	var adress = req.body.adress
	var autograph = req.body.autograph
	var hobby = req.body.hobby
	var uid = req.body.uid
	var sql = 'UPDATE m_user SET uname = ?,phone=?,email=?,adress=?,autograph=?,hobby=? WHERE uid = ?'
	pool.query(sql,[uname,phone,email,adress,autograph,hobby,uid],(err,result)=>{
		if(err) throw err 
		if(result.affectedRows > 0)
		{
			res.send(JSON.stringify({state:'ok'}))
		}
	})
})
module.exports = router;