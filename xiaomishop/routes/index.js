const express = require('express')
const pool = require('../pool')
const router = express.Router()
router.get('/getCarousel',(req,res)=>{
	var sql = "SELECT * FROM m_index_carousel"
	pool.query(sql,(err,result)=>{
		if(err) throw err
		res.send(JSON.stringify(result))
	})
})
router.get('/getCheap',(req,res)=>{
	var sql = 'SELECT lid,title,subtitle,price,original_price,img,discount FROM m_laptop WHERE fid=3'
	pool.query(sql,(err,result)=>{
		if(err) throw err
		res.send(JSON.stringify(result))
	})
})
router.get('/getPhone',(req,res)=>{
	var sql = 'SELECT lid,title,subtitle,price,original_price,img,discount FROM m_laptop WHERE fid=1 ORDER BY lid DESC LIMIT 0,8'
	pool.query(sql,(err,result)=>{
		if(err) throw err
		res.send(JSON.stringify(result))
	})
})
router.get('/getJiadian',(req,res)=>{
	var sql = 'SELECT lid,title,subtitle,price,original_price,img,discount,comment,from_user FROM m_laptop WHERE fid=2 ORDER BY lid DESC LIMIT 0,8'
	pool.query(sql,(err,result)=>{
		if(err) throw err
		res.send(JSON.stringify(result))
	})
})
router.get('/getZhineng',(req,res)=>{
	var sql = 'SELECT lid,title,subtitle,price,original_price,img,discount,comment,from_user FROM m_laptop WHERE fid=4 ORDER BY lid DESC LIMIT 0,8'
	pool.query(sql,(err,result)=>{
		if(err) throw err
		res.send(JSON.stringify(result))
	})
})
router.get('/getDapei',(req,res)=>{
	var sql = 'SELECT lid,title,subtitle,price,original_price,img,discount,comment,from_user FROM m_laptop WHERE fid=5 ORDER BY lid DESC LIMIT 0,8'
	pool.query(sql,(err,result)=>{
		if(err) throw err
		res.send(JSON.stringify(result))
	})
})
module.exports = router;