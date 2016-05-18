/**
 * 抽奖模块
 * @author apps
 * @date   16-4-20
 * @version
 */

exports.findLotteryToday = function(bfw , req , res){
  console.log("**************findLotteryToday*************");
  var data = '';
  BDubbo.get('haoyi_lottery.findLotteryToday', data, function(result){
    console.log("返回结果"+JSON.stringify(result));
    res.json(result);
  });
};

exports.findLotteryYesterday = function(bfw , req , res){
  console.log("**************findLotteryYesterday*************");
  var data = '';
  BDubbo.get('haoyi_lottery.findLotteryYesterday', data, function(result){
    console.log("返回结果"+JSON.stringify(result));
    res.json(result);
  });
};

exports.findLotteryByUid = function(bfw , req , res){
  console.log("**************findLotteryByUid*************");
  //var uid = req.query.uid;
  var uid  = req.session.userInfo.uid;
  BDubbo.get('haoyi_lottery.findLotteryByUid', {uid:uid}, function(result){
    console.log("返回结果"+JSON.stringify(result));
    res.json(result);
  });
};

exports.findHistoryPage = function(bfw , req , res){
  console.log("**************findHistoryPage*************");
  var data = req.body;
  BDubbo.post('haoyi_lottery.findHistoryPage', data, function(result){
    console.log("返回结果"+JSON.stringify(result));
    res.json(result);
  });
};


exports.findUserHistoryPage = function(bfw , req , res){
  console.log("**************findUserHistoryPage*************");
  var data = req.body;
  data.uid = req.session.userInfo.uid;
  BDubbo.post('haoyi_lottery.findUserHistoryPage', data, function(result){
    console.log("返回结果"+JSON.stringify(result));
    res.json(result);
  });
};


exports.findAllLottery = function(bfw , req , res){
  console.log("**************findAllLottery*************");
  var data = "";
  BDubbo.get('haoyi_lottery.findAllLottery', data, function(result){
    console.log("返回结果"+JSON.stringify(result));
    res.json(result);
  });
};


