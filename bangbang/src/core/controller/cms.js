/**
 * 广告模块
 * @author apps
 * @date   16-3-14
 * @version
 */

var redis = require('redis');
exports.findResourceByColId = function(bfw , req , res ,next){
    console.log("**************findResourceByColId*************");
    var colId       = req.query.colId;
    BDubbo.get('haoyi_cms.findResourceByColId', {colId:colId}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.saveConfig = function(bfw , req , res ,next){
    console.log("**************saveConfig*************");
    var config = req.body;
    redis.set('haoyi_cms_config',config, function(err, data){
        console.log("**************save error:"+err);
        res.json(data);
    });
};

exports.getConfig = function(bfw , req , res ,next){
    console.log("**************getConfig*************");
    redis.get('haoyi_cms_config', function (error, data) {
        console.log("**************get error:"+err);
        res.json(JSON.parse(data));
    });
};


