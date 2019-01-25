const auth=require('../middleWares/auth')
module.exports = function(app){
  // 统一配置路由前缀
  app.use('/',require('./main.js'))
  app.use('/login',require('./login'))  
  app.use('/sm/user',auth,require('./user')) 
};

