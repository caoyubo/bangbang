/**
 *  翡翠积分模块
 * @author apps
 * @date   16-3-17
 * @version
 */

module.exports = function (bfw, router) {

  router.get('/findByUid', function (req, res) {
    console.log("**************findByUid*************");
    //var uid = req.query.uid;
    var uid = req.session.userInfo.uid;
    BDubbo.get('haoyi_jade.findByUid', {uid: uid}, function (result) {
      console.log("返回结果" + JSON.stringify(result));
      res.json(result);
    })
  });

  router.post('/update', function (req, res) {
    console.log("**************update*************");
    var data      = req.body;
    data.ownerid  = req.session.userInfo.uid;
    BDubbo.post('haoyi_jade.update', data, function (result) {
      console.log("返回结果" + JSON.stringify(result));
      res.json(result);
    })
  });

  router.post('/getDetail', function (req, res) {
    console.log("**************getDetail*************");
    var data      = req.body;
    data.ownerid  = req.session.userInfo.uid;
    BDubbo.post('haoyi_jade.getDetail', data, function (result) {
      console.log("返回结果" + JSON.stringify(result));
      res.json(result);
    })
  });
}
