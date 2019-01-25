module.exports={
    db:{
        // 数据库链接
        url:'mongodb://localhost:27017/ahuife'
    },
    jwt:{
        // 配置jwt秘钥
        secret:'my name is ahui',
        // 配置秘钥过期时间
        expiresIn:'1h'
    }
    
}