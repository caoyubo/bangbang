/**
 *  地址管理模块
 * @author apps
 * @date   16-3-7
 * @version
 */

//用户地址管理模块
var redis = require('../common/bredis');


//用户增加地址
exports.add = function (bfw , req , res ,next) {
  console.log('**************address/add*************');
  var data = req.body;
  data.uid = req.session.userInfo.uid;
  BDubbo.post('haoyi_usercenter.addr_add', data, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};

exports.update = function (bfw , req , res ,next) {
  console.log('**************address/update*************');
  var data = req.body;
  data.uid = req.session.userInfo.uid;
  BDubbo.post('haoyi_usercenter.addr_update', data, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};

exports.findByUid = function (bfw , req , res ,next) {
  console.log('**************address/find*************');
  //var uid = req.query.uid;
  var uid = req.session.userInfo.uid;
  BDubbo.get('haoyi_usercenter.addr_findByUid', {uid: uid}, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};

exports.findById = function (bfw , req , res ,next) {
  console.log('**************address/findById*************');
  var id = req.query.id;
  BDubbo.get('haoyi_usercenter.addr_findById', {id: id}, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};

exports.delete = function (bfw , req , res ,next) {
  console.log('**************address/delete*************');
  var id = req.query.id;
  BDubbo.get('haoyi_usercenter.addr_delete', {id: id}, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};

exports.setDefault = function (bfw , req , res ,next) {
  console.log('**************address/set/default*************');
  var data = req.body;
  data.uid = req.session.userInfo.uid;
  BDubbo.post('haoyi_usercenter.addr_setDefault', data, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};

//根据uid查找
exports.getDefault = function (bfw , req , res ,next) {
  console.log('**************address/get/default*************');
  //var uid = req.query.uid;
  BDubbo.get('haoyi_usercenter.addr_getDefault', {uid: uid}, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};

exports.findAllCountry = function (bfw , req , res ,next) {
  console.log('**************address/findAllCountry*************');
  BDubbo.get('haoyi_shop.findAllCountry', '', function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};
exports.findByPid = function (bfw , req , res ,next) {
  console.log('**************address/findByPid*************');
  var pid = req.query.pid;
  BDubbo.get('haoyi_shop.region_findByPid', {pid: pid}, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};


/**
 * 保存国家信息
 */
exports.setCountry = function (bfw , req , res ,next) {
  console.log('**************address/set/country*************');
  var countryJson = req.body;
  redis.set('haoyi_address_country', countryJson, function (err, data) {
    console.log("save error:" + err);
    res.json(data);
  });
};


exports.getCountry = function (bfw , req , res ,next) {
  console.log('**************address/set/country*************');
  redis.get('haoyi_address_country', function (err, data) {
    res.json(JSON.parse(data));
  });
};


