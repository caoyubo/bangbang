/**
 * Created by ljm on 2016/3/18.
 */

(function() {
  "use strict";

  TigerController.controller('orderDetailCtrl',function($scope,$cookieStore,$stateParams,$ionicActionSheet,$timeout,globalService,publicFunction) {
    $scope.id = $stateParams.id;
    $scope.orderDetail = {}
    $scope.imgUrl = TigerConfig.imgUrl;
    $scope.user = $cookieStore.get('userInfo');
    console.log("id::"+$stateParams.id)

    $scope.getDateFormat = publicFunction.getDateFormat;

    $scope.request = {
      orderDetail : function(){
        globalService.commonGet(TigerConfig.api.orderDetail+"?id="+$scope.id).then(function(result){
          console.log("订单详情::");
          console.log(result);
          if(result.code == 0){
            $scope.orderDetail = result.data;
            if(result.data.list !=undefined && result.data.list != null){

            }
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      }
    }

    /*$scope.request = {
     orderDetail : function(){
     //获取支付类型
     globalService.commonGet('data/orderDetail.json').then(function(result){
     console.log("订单详情::");
     console.log(result);
     if(result.code == 0){
     $scope.orderDetail = result.data;

     }
     },function(error){
     console.log("请求失败！");
     console.log(error);
     });
     }
     }*/

    //获取订单列表
    $scope.request.orderDetail();

  })

})();
