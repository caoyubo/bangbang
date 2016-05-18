/**
 * 商店模块
 * @author apps
 * @date   16-2-1
 * @version
 */

/**
 * 根据商店id查找商店信息
 */
exports.findById = function(bfw , req , res){
    console.log("**************findById*************");
    var shopId = req.query.shopId;
    console.log("**************"+req.query.shopId+"*************");
    BDubbo.get('haoyi_shop.findById', {shopId:shopId}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

exports.fans_select = function(bfw , req , res){
  console.log("**************select*************");
  var shopId = req.query.shopId;
  //var userId = req.query.userId;
  var userId = req.session.userInfo.uid;
  BDubbo.get('haoyi_shop.fans_select', {userId:userId,shopId:shopId}, function(result){
    console.log("返回结果"+JSON.stringify(result));
    res.json(result);
});
};


exports.fans_delete = function(bfw , req , res){
  console.log("**************delete*************");
  var shopId = req.query.shopId;
  //var userId = req.query.userId;
  var userId = req.session.userInfo.uid;
  BDubbo.get('haoyi_shop.fans_delete', {userId:userId,shopId:shopId}, function(result){
    console.log("返回结果"+JSON.stringify(result));
    res.json(result);
});
};

exports.fans_create = function(bfw , req , res){
  console.log("**************create*************");
  var data    = req.body;
  data.userId = req.session.userInfo.uid;
  BDubbo.post('haoyi_shop.fans_create', data, function(result){
    console.log("返回结果"+JSON.stringify(result));
    res.json(result);
  });
};

exports.fans_count = function(bfw , req , res){
console.log("**************count*************");
var shopId = req.query.shopId;
BDubbo.get('haoyi_shop.fans_count', {shopId:shopId}, function(result){
  console.log("返回结果"+JSON.stringify(result));
  res.json(result);
});
};

exports.add_store = function(bfw , req , res){
  console.log("**************add_store*************");
  var params = req.body;
  console.log('params:',params);
  var option = {
      appId     : params.appId,
      //userId    : params.userId,
      userId    : req.session.userInfo.uid,
      shopName  : params.storeName,
      supervisor: params.trueName,
      idcard    : params.idcard,
      shopCategoryId    : 0,
  }
  BDubbo.post('haoyi_shop.store_add', option, function(result){
      console.log("返回结果"+JSON.stringify(result));
      res.json(result);
  });
};

/**
 * 个人是否有开商店
 */
exports.hasShop = function(bfw , req , res){
    var uid = req.query.uid;
    BDubbo.get('haoyi_shop.hasShop',{uid:uid},function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

/**
 * 个人代理商品列表
 */
exports.myProxyGoods = function(bfw , req , res){
    var uid = req.query.uid;
    BDubbo.post('haoyi_goods.goodsList',{uid:uid},function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

/**
 * 个人商店信息
 */
exports.shopInfo = function(bfw , req , res){
    var uid = req.query.uid;
    BDubbo.get('haoyi_shop.shopInfo',{uid:uid},function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

/**
 * 解绑
 */
exports.unBindShop = function(bfw , req , res){
    var uid = req.query.uid;
    BDubbo.get('haoyi_goods.unBindShop',{uid:uid},function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
};

/**
 * 个人回应邀请
 */
exports.inviteVerify = function(bfw , req , res){
    var id = req.query.id;
    var state = req.query.state;
    BDubbo.get('haoyi_goods.inviteVerify',{id:id,state:state},function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
}
