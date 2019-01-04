const express = require('express')
const pool = require('../pool')
const router = express.Router()
router.get('/',(req,res)=>{
	var fid = req.query.fid;
	var pno = req.query.pno;
	var output = {
		pageSize:10
	}
	output.pno = pno;
	var sql = 'SELECT lid,title,subtitle,price,img FROM m_laptop WHERE fid = ? '
	pool.query(sql,[fid],(err,result)=>{
		if(err) throw err
		if(result.length > 0)
		{
			output.count = result.length;
			output.pageCount = Math.ceil(result.length/output.pageSize)
			output.products = result.slice(output.pno*10,output.pno*10 + 10)
			res.send(JSON.stringify(output))
		}
	})
})
router.get('/search',(req,res)=>{
	var search = req.query.search ;
	
	var pno = req.query.pno;
	var output = {
		pageSize:10
	}
	output.pno = pno;
	var sql = 'SELECT lid,title,subtitle,price,img FROM m_laptop WHERE title like '
	sql+= `'%${search}%'`
	
	pool.query(sql,[search],(err,result)=>{
		if(err) throw err
		if(result.length > 0)
		{
			output.count = result.length;
			output.pageCount = Math.ceil(result.length/output.pageSize)
			output.products = result.slice(output.pno*10,output.pno*10 + 10)
			res.send(JSON.stringify(output))
		}
	})
})


module.exports = router
