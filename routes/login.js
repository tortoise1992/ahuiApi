const express = require('express')
const router = express.Router();
const jwt=require('jsonwebtoken')
const config=require('../config')
let mysql=require('../mysql')
router.post('/', function (req, res, next) {
    const {username,password}=req.body
    mysql.query(`select * from sys_user where username="${username}" and password="${password}"`,[],(results)=>{
        // 登录成功之后返回token
        if(results[0]){
            jwt.sign({username,password},config.jwt.secret,{expiresIn:config.jwt.expiresIn},(err,token)=>{
                if(!err){
                    res.json({
                        success:true,
                        msg:'成功',
                        token:token
                    });  
                }else{
                    res.json({
                        success:false,
                        msg:'token生成失败'
                    });
                }
            })
        }else{
            res.json({
                success:false,
                msg:'用户名或者密码错误'
            });
        }
    })
});
module.exports = router