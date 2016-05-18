/**
 * faq  模块
 * @author apps
 * @date   16-3-11
 * @version
 */

var redis = require('redis');
exports.setFaq = function(bfw , req , res){
    console.log('**************faq/set/faq*************');
    var faqJson = req.body;
    redis.set('haoyi_faq_json', faqJson, function(err, data){
        console.log("save error:"+err);
        res.json(data);
    });
};


exports.getFaq = function(bfw , req , res){
    console.log('**************faq/get/faq*************');
    redis.get('haoyi_faq_json', function(err, data){
        res.json(JSON.parse(data));
    });
};
