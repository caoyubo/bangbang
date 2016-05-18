/**
 * Created by ljm on 2016/3/23.
 */

(function() {
  "use strict";

  TigerController.controller('lotteryCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$timeout,$state,globalService,$ionicPopup) {

    $scope.user = $cookieStore.get('userInfo');

    $scope.lottery = {};
    $scope.lotteryYes = {};

    $scope.request = {
      findLotteryToday : function(){
        globalService.commonGet(TigerConfig.api.findLotteryToday).then(function(result){
          console.log("今日抽奖信息::");
          console.log(result);
          if(result != undefined){
            if(result.code != undefined && result.code == "0"){
              $scope.lottery = result.data;
            }else{
              //alert(result.mes);
              $ionicPopup.alert({
                title : result.mes,
                okText : '确定'
              })
            }
          }
        },function(error){
          console.log("查询信息失败！");
          console.log(error);
        })
      },
      findLotteryYesterday : function(){
        globalService.commonGet(TigerConfig.api.findLotteryYesterday).then(function(result){
          console.log("上期抽奖信息::");
          console.log(result);
          if(result != undefined){
            if(result.code != undefined && result.code == "0"){
              $scope.lotteryYes = result.data;
            }else{
              //alert(result.mes);
            }
          }
        },function(error){
          console.log("查询信息失败！");
          console.log(error);
        })
      }
    }

    //查询今日抽奖信息
    $scope.request.findLotteryToday();
    //查询上期抽奖信息
    $scope.request.findLotteryYesterday();
  })

})();

