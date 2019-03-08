let mysql = require('mysql');//引入mysql模块
var Config = require('../config');  //引入数据库配置模块中的数据
let pool=mysql.createPool(
    Config.mysql
)
//向外暴露方法
module.exports = {
    query: function (sql, params, callback) {
        // 采取连接池的形式操作mysql
        pool.getConnection(function(err,connection){
            if(err){
                console.log('数据库链接失败');
                throw err;
            }
            connection.query(sql,params,function(error,results,fields){
                //将链接返回到连接池中，准备由其他人重复使用
                connection.release();
                if(error) {
                    console.log('数据操作失败');
                    throw error;
                }
                //执行回调函数，将数据返回
                callback && callback(results,fields);
            });
        });    
    }
};