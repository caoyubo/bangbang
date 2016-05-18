/**
 *  礼品模块
 * @author kam
 * @date   16-2-1
 * @version
 */
var redis = require('../common/bredis');
/**
 * 更新商品库存
 */
exports.upstock = function(bfw , req , res){
    console.log("**************stock get*************");
    var valueid = req.query.valueid;
    var step    = req.query.step;
    var data    = {valueid:valueid, step:step};
    BDubbo.get('haoyi_gift.upstock', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

/**
 * 搜索商品
 */
exports.findGoods = function(bfw , req , res){
    console.log("**************findGoods*************");
    var data = req.body;
    BDubbo.post('haoyi_gift.findGoods', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

/**
 * 根据id查找商品详情
 */
exports.findById = function(bfw , req , res){
    console.log("**************findById*************");
    var id = req.query.id;
    BDubbo.get('haoyi_gift.findById',{id:id}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.findFirstGoods = function(bfw , req , res){
    console.log("**************findFirstGoods*************");
    var data = '';
    BDubbo.get('haoyi_gift.findFirstGoods',data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.findByParent = function(bfw , req , res){
    console.log("**************findByParent*************");
    var goodsclassid = req.query.goodsclassid;
    BDubbo.get('haoyi_gift.findByParent',{goodsclassid:goodsclassid}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.findSecAndThr = function(bfw , req , res){
    console.log("**************findSecAndThr*************");
    var goodsclassid = req.query.goodsclassid;
    BDubbo.get('haoyi_gift.findSecAndThr',{goodsclassid:goodsclassid}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};
exports.saveCondition = function(bfw , req , res){
    console.log("**************saveCondition*************");
    var condition = req.body;
    redis.set('haoyi_gift_condition',condition, function(err, data){
        console.log("save error:"+err);
        res.json(data);
    });
};

exports.getCondition = function(bfw , req , res){
    console.log("**************getCondition*************");
    redis.get('haoyi_gift_condition', function (error, data) {
        res.json(JSON.parse(data));
    });
};

