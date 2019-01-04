const express = require("express")
const router = express.Router()
const pool = require("../pool")

router.get("/add", (req, res) => {
	var lid = req.query.lid;
	var count = 1;
	var uid = req.session.uid;
	pool.query(
		"select * from m_shoppingcart_item where uid=? and lid=?", [uid, lid],
		(err, result) => {
			if(err) throw err;
			if(result.length == 0) {
				pool.query(
					"insert into m_shoppingcart_item values(null,?,?,1)", [uid, lid],
					(err, result) => {
						if(err) throw err;
						res.end();
					})
			}
			else {
				pool.query(
					"update m_shoppingcart_item set count=count+? where uid=? and lid=?", [count, uid, lid],
					(err, result) => {
						if(err) throw err;
						res.end();
					})
			}
		}
	)
})
router.get("/count",(req,res) => {
	var uid = req.session.uid;
	var count=0;
	var sql = "SELECT uid,count FROM m_shoppingcart_item"
	pool.query(sql,[uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			for(var key of result)
			{
				if(key.uid == uid)
				{
					count += key.count
					
				}
			}
			res.send(JSON.stringify({count:count}))
		}else{
			res.send(JSON.stringify({count:0}))
		}
	
	})
})
router.get("/",(req,res) => {
	var uid = req.session.uid;
	var sql = "SELECT * FROM m_laptop l,m_shoppingcart_item s WHERE l.lid = s.lid AND uid = ?"
	pool.query(sql,[uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(JSON.stringify(result))
		}else{
			res.send(JSON.stringify({state:'no'}))
		}
	
	})
})
module.exports = router;