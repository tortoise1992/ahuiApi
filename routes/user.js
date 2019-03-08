const express = require('express')
const router = express.Router();
let mysql=require('../mysql')
const Moment=require('moment')
// 获取用户列表
router.get('/list', function (req, res, next) {
    const {pageSize,page}=req.body
    let p=page || 1,ps=pageSize || 10;
    mysql.query(
        `select * from sys_user limit ${(p-1)*ps}, ${ps}`,[],
        results=>{
            res.json({
                success:true,
                msg:'操作成功',
                obj:{
                    page,
                    pageSize:ps,
                    rows:results
                }                        
            })
        }
    )    
    
});
// 新增用户
router.post('/add', function (req, res, next) {
    const user=req.body
    // 先查重
    let username=user.username
    mysql.query(`select * from sys_user where username="${username}"`,[],(results)=>{
        if(results[0]){
            res.json({
                success:false,
                msg:'用户名重复'
            })
        }else{
            // 插入数据库
            let createTime=Moment().format('YYYY-MM-DD HH:MM:SS')
            mysql.query('INSERT INTO sys_user(username, password,create_time) VALUES(?, ?,?)',[username,user.password,createTime ], (err, results) => {
                if(err){
                    console.log(err);
                }
                res.json({
                    success:true,
                    msg:'操作成功'
                })
            })            
        }
    })
    
});
//修改用户信息
router.post('/update', function (req, res, next) {
    // const user=req.body
    // let str=''
    // for(key in user){
    //     str+=key+'='+user[key]+','
    // }
    // let sql=`update sys_user set ${str} where id=${user.id}`
    // mysql.query(sql,res=>{
    //     console.log(res)
    // })
});
// update table_name set col1 = v1 , col2 = v2 where id=vid
// 删除用户
router.post('/delete', function (req, res, next) {
    const id=req.body._id
    User.deleteOne({_id:id},(err,result)=>{
        if(!err){
            res.json({
                success:true,
                msg:'操作成功'
            })
        }
    })
});
module.exports = router