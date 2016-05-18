/**
 *  收藏模块
 * @author apps
 * @date   16-3-7
 * @version
 */

//增加收藏
exports.add = function (bfw , req , res) {
  console.log('**************collect/add*************');
  var data = req.body;
  data.uid = req.session.userInfo.uid;
  BDubbo.post('haoyi_usercenter.col_add', data, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};
//删除个人收藏
exports.delete = function (bfw , req , res) {
  console.log('**************collect/delete*************');
  var id = req.query.id;
  BDubbo.get('haoyi_usercenter.col_delete', {id: id}, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
};
//分页查询收藏
exports.listpage = function (bfw , req , res) {
  console.log('**************collect/listpage*************');
  var data = req.body;
  data.uid = req.session.userInfo.uid;
  var id = data.ptype;
  if (id == 0) {
    BDubbo.post('haoyi_integration.findUserGoods', data, function (result) {
      console.log('result' + JSON.stringify(result));
      res.json(result);
    });
  } else if (id == 1) {
    BDubbo.post('haoyi_integration.findUserShop', data, function (result) {
      console.log('result' + JSON.stringify(result));
      res.json(result);
    });
  } else {
    res.json({code: -1, msg: "ptype 不存在", data: null});
  }

};
//统计收藏量
exports.count = function (bfw , req , res) {
  console.log('**************collect/count*************');
  var id = req.body.id;
  BDubbo.post('haoyi_usercenter.col_listpage', {id: id}, function (result) {
    console.log('result' + JSON.stringify(result));
    res.json(result);
  });
}


