var express = require('express')
var router = express.Router();
router.get('/', function (req, res, next) {
    res.json({
        success:true,
        msg:'success'
    });
});
module.exports = router