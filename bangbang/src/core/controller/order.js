/**
 *  订单模块
 * @author apps
 * @date   16-3-9
 * @version
 */

//根据id查找订单详情
exports.findById = function (bfw , req , res) {
  console.log('**************order/findById*************');
  var id = req.query.id;
  BDubbo.get('haoyi_order.findById', {id: id}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.create = function (bfw , req , res) {
  console.log('**************order/create*************');
  var data      = req.body;
  data.buyerid  = req.session.userInfo.uid;
  data.paytype  = "9";//正常商品下單
  BDubbo.post('haoyi_order.create', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.giftCreate = function (bfw , req , res) {
  console.log('**************order/create*************');
  var data      = req.body;
  data.paytype  = "2";//翡翠商品下單
  data.buyerid  = req.session.userInfo.uid;
  BDubbo.post('haoyi_order.giftCreate', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.cartCreate = function (bfw , req , res) {
  console.log('**************order/cart/create*************');
  var data = req.body;
  data.buyerid  = req.session.userInfo.uid;
  BDubbo.post('haoyi_order.cartCreate', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.get = function (bfw , req , res) {
  console.log('**************order/get*************');
  var data = req.body;
  data.buyerUid = req.session.userInfo.uid;
  BDubbo.post('haoyi_order.get', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.getPayList = function (bfw , req , res) {
  console.log('**************order/getPayList*************');
  BDubbo.get('haoyi_order.getPayList', '', function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.pay = function (bfw , req , res) {
  console.log('**************order/pay*************');
  var data = req.body;
  BDubbo.post('haoyi_order.pay', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.getBillOrder = function (bfw , req , res) {
  console.log('**************order/getBillOrder*************');
  var id = req.query.id;
  BDubbo.get('haoyi_order.getBillOrder', {id: id}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.goodsComment = function (bfw , req , res) {
  console.log('**************order/goodsComment*************');
  var data = req.body;
  BDubbo.post('haoyi_integration.goodsComment', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.paycallback = function (bfw , req , res) {
  console.log('**************order/paycallback*************');
  var data = req.body;
  BDubbo.post('haoyi_order.paycallback', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.callbackurl = function (bfw , req , res) {
  console.log('**************order/callbackurl*************');
  var data = req.body;
  res.render("www/index");
};

exports.giftPay = function (bfw , req , res) {
  console.log('**************order/gift/pay*************');
  var id = req.query.id;
  BDubbo.get('haoyi_order.gift_pay', {id: id}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.listPage = function (bfw , req , res) {
  console.log('**************order/listPage*************');
  var data = req.body;
  data.uid = req.session.userInfo.uid;
  BDubbo.post('haoyi_order.listPage', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};



