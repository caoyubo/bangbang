/**
 * 商品
 */

/**
 * 获取可销售的商品
 */
exports.sell = function(bfw , req , res ,next){
    console.log("**************sell get*************");
    var shopid  = req.query.shopid;
    var data    = {shopid:shopid};
    BDubbo.get('haoyi_goods.sell',data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

/**
 * 更新商品库存
 */
exports.upstock = function(bfw , req , res ,next){
    console.log("**************stock get*************");
    var valueid = req.query.valueid;
    var step    = req.query.step;
    var data    = {valueid:valueid, step:step};
    BDubbo.get('haoyi_goods.upstock', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

/**
 * 搜索商品
 */
exports.findGoods = function(bfw , req , res ,next){
    console.log("**************findGoods*************");
    var data = req.body;
    BDubbo.post('haoyi_goods.findGoods', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

/**
 * 根据id查找商品详情
 */
exports.findById = function(bfw , req , res ,next){
    console.log("**************findById*************");
    var id = req.query.id;
    BDubbo.get('haoyi_goods.findById',{id:id}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.findByShopId = function(bfw , req , res ,next){
    console.log("**************findByShopId*************");
    var shopid = req.query.shopid;
    BDubbo.get('haoyi_goods.findByShopId', {shopid:shopid}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.findFirstGoods = function(bfw , req , res ,next){
    console.log("**************findFirstGoods*************");
    var data = '';
    BDubbo.get('haoyi_goods.findFirstGoods',data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.findByParent = function(bfw , req , res ,next){
    console.log("**************findByParent*************");
    var goodsclassid = req.query.goodsclassid;
    BDubbo.get('haoyi_goods.findByParent',{goodsclassid:goodsclassid}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.findSecAndThr = function(bfw , req , res ,next){
    console.log("**************findSecAndThr*************");
    var goodsclassid = req.query.goodsclassid;
    BDubbo.get('haoyi_goods.findSecAndThr',{goodsclassid:goodsclassid}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};


exports.saveCondition = function(bfw , req , res ,next){
    console.log("**************saveCondition*************");
    var condition = req.body;
    redis.set('haoyi_goods_condition',condition, function(err, data){
        console.log("save error:"+err);
        res.json(data);
    });
};

exports.getCondition = function(bfw , req , res ,next){
    console.log("**************getCondition*************");
    redis.get('haoyi_goods_condition', function (error, data) {
        res.json(JSON.parse(data));
    });
};

exports.findBrand = function(bfw , req , res ,next){
    console.log("**************findBrand*************");
    var data = req.body;
    BDubbo.post('haoyi_goods.findBrand',data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};


exports.findComment = function(bfw , req , res ,next){
    console.log("**************findComment*************");
    var data = req.body;
    BDubbo.post('haoyi_goods.findComment',data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.deleteComment = function(bfw , req , res ,next){
    console.log("**************deleteComment*************");
    var id = req.query.id;
    BDubbo.get('haoyi_goods.deleteComment',{id:id}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};