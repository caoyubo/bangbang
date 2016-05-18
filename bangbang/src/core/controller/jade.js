/**
 *  翡翠积分模块
 * @author apps
 * @date   16-3-17
 * @version
 */

exports.findByUid = function (bfw , req , res) {
  console.log("**************findByUid*************");
  //var uid = req.query.uid;
  var uid = req.session.userInfo.uid;
  BDubbo.get('haoyi_jade.findByUid', {uid: uid}, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  })
};

exports.update = function (bfw , req , res) {
  console.log("**************update*************");
  var data      = req.body;
  data.ownerid  = req.session.userInfo.uid;
  BDubbo.post('haoyi_jade.update', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  })
};

exports.getDetail = function (bfw , req , res) {
  console.log("**************getDetail*************");
  var data      = req.body;
  data.ownerid  = req.session.userInfo.uid;
  BDubbo.post('haoyi_jade.getDetail', data, function (result) {
    console.log("返回结果" + JSON.stringify(result));
    res.json(result);
  })
};

