module.exports={
    mysql:{
        host : 'localhost',
        port : 3306,//端口号
        database : 'sunmnet',//数据库名
        user : 'root',//数据库用户名
        password : '123456'//数据库密码
    },
    jwt:{
        // 配置jwt秘钥
        secret:'my name is ahui',
        // 配置秘钥过期时间
        expiresIn:'1h'
    }
    
}