const jwt=require('jsonwebtoken')
const config=require('../config')
// 对jwt进行过期验证
module.exports=(req,res,next)=>{
    const token=req.headers.token
    // 先解密
    jwt.verify(token, config.jwt.secret,function(err,decoded){
        if(err || !decoded) res.status(403).json({
            success:false,
            msg:'请重新登录'
        })
        next()
    });
}