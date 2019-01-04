const express = require('express')
const pool = require('../pool')
const router = express.Router();
router.get("/",(req,res)=>{
	var lid = req.query.lid;
	var sql = "SELECT * FROM m_laptop WHERE lid = ?"
	pool.query(sql,lid,(err,result)=>{
		if(err) throw err;
		res.send(JSON.stringify(result))
	})
})
//router.get("/addShoppong_cart",(req,res)=>{
//	var fid = req.query.fid;
//	
//})



module.exports = router;
