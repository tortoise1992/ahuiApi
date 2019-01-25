const mongoose=require('mongoose'),config=require('../config')
mongoose.connect(config.db.url,{ useNewUrlParser: true })
mongoose.connection.on('connected',function(){
    console.log('数据库连接成功')
})
mongoose.connection.on('error',function(){
    console.log('数据库连接失败')
})
mongoose.connection.on('disconnected',function(){
    console.log('数据库连接断开')
})

module.exports=mongoose