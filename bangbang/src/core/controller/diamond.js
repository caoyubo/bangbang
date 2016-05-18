/**
 *  钻石积分模块
 * @author apps
 * @date   16-3-19
 * @version
 */


exports.findByUid = function (bfw , req , res) {
  console.log("**************findByUid*************");
  //var uid = req.query.uid;
  var uid = req.session.userInfo.uid;
  BDubbo.get('haoyi_diamond.findByUid', {uid: uid}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.getDetail = function (bfw , req , res) {
  console.log("**************getDetail*************");
  var data      = req.body;
  data.custCode = req.session.userInfo.uid;
  BDubbo.post('haoyi_diamond.getDetail', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.operate = function (bfw , req , res) {
  console.log("**************operate*************");
  var data                      = req.body;
  data.bankCardInfoReq.custCode = req.session.userInfo.uid;
  BDubbo.post('haoyi_diamond.operate', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.checkPassword = function (bfw , req , res) {
  console.log("**************checkPassword*************");
  //var uid = req.query.uid;
  var uid = req.session.userInfo.uid;
  var pwd = req.query.pwd;
  BDubbo.get('haoyi_diamond.checkPassword', {uid: uid, pwd: pwd}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.modifyPassword = function (bfw , req , res) {
  console.log("**************checkPassword*************");
  var accname = req.query.accname;
  var oldpwd = req.query.oldpwd;
  var newpwd = req.query.newpwd;
  BDubbo.get('haoyi_diamond.modifyPassword', {accname: accname, oldpwd: oldpwd, newpwd: newpwd}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.withdraw = function (bfw , req , res) {
  console.log("**************withdraw*************");
  var data     = req.body;
  data.ownerid = req.session.userInfo.uid;
  BDubbo.post('haoyi_diamond.withdraw', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.findWithdraw = function (bfw , req , res) {
  console.log("**************findWithdraw*************");
  var data      = req.body;
  data.ownerid  = req.session.userInfo.uid;
  BDubbo.post('haoyi_diamond.findWithdraw', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


exports.getPayData = function (bfw , req , res) {
  console.log("**************getPayData*************");
  var data = req.body;
  data.uid = req.session.userInfo.uid;
  data.callbackurl = BConfig.conf('callbackurl');
  BDubbo.post('haoyi_integration.getPayData', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};

exports.getPayUrl = function (bfw , req , res) {
  console.log("**************getPayUrl*************");
  var data = req.body;
  data.uid = req.session.userInfo.uid;
  data.callbackurl = BConfig.conf('callbackurl');
  BDubbo.post('haoyi_integration.getPayUrl', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  });
};


