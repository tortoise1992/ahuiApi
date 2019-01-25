const mongoose=require('../db'),Schema=mongoose.Schema
const userSchema=new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    loginDate:{
        type:Date
    },
    createTime:{

    },
    token:{
        type:String
    }
})
// 设置最后一个参数，确定表名
module.exports=mongoose.model('User',userSchema,'user')
