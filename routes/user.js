const express = require('express')
const router = express.Router();
const User =require('../models/user')
const Moment=require('moment')
// 获取用户列表
router.get('/list', function (req, res, next) {
    const {pageSize,page}=req.body
    User.countDocuments((err,count)=>{
        if(!err){
            // 分页查询的重点，skip和limit
            User.find({}).skip((page-1)*pageSize).limit(pageSize).exec((err,result)=>{
                if(!err){
                    res.json({
                        success:true,
                        msg:'操作成功',
                        obj:{
                            page,
                            pageSize,
                            total:count,
                            rows:result
                        }                        
                    })
                }
            })
        }
    })
    
});
// 新增用户
router.post('/add', function (req, res, next) {
    const user=req.body
    // 先查重
    let username=user.username
    User.find({username},(err,result)=>{
        if(!err){
            if(result.length>0){
                res.json({
                    success:false,
                    msg:'用户名重复'
                })
            }else{
                // 插入数据库
                user.createTime=Moment().format('YYYY-MM-DD HH:MM:SS')
                User.create(user,(err,result)=>{
                    if(!err){
                        res.json({
                            success:true,
                            msg:'操作成功'
                        })
                    }
                })
            }
        }
    })    
    
});
//修改用户信息
router.post('/update', function (req, res, next) {
    const user=req.body
    User.update({_id:user._id},user,(err,result)=>{
        if(!err){
            res.json({
                success:true,
                msg:'操作成功'
            })
        }
    })
});
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