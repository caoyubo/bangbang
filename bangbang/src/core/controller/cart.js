/**
 *  购物车模块
 * @author apps
 * @date   16-3-9
 * @version
 */

exports.findCart = function (bfw , req , res ,next) {
  console.log('**************cart/findCart*************');
  var appId = req.query.appId;
  //var userId  = req.query.userId;
  var userId = req.session.userInfo.uid;
  BDubbo.get('haoyi_goods.cart_find', {appId: appId, userId: userId}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.add = function (bfw , req , res ,next) {
  console.log('**************cart/add*************');
  var data = req.body;
  data.userid = req.session.userInfo.uid;
  BDubbo.post('haoyi_goods.cart_add', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.delete = function (bfw , req , res ,next) {
  console.log('**************cart/delete*************');
  var id = req.query.id;
  BDubbo.get('haoyi_goods.cart_del', {id: id}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.updateNumber = function (bfw , req , res ,next) {
  console.log('**************cart/updateNumber*************');
  var id = req.query.id;
  var number = req.query.number;
  BDubbo.get('haoyi_goods.cart_updateNumber', {id: id, number: number}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.deleteBatch = function (bfw , req , res ,next) {
  console.log('**************cart/deleteBatch*************');
  var data = req.body.ids;
  BDubbo.post('haoyi_goods.cart_del_batch', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


