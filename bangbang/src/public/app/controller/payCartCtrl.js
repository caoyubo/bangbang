/**
 * Created by ljm on 2016/3/8.
 */

(function() {
  "use strict";

  TigerController.controller('payCartCtrl',function($scope,$cookieStore,$ionicActionSheet,$stateParams,$ionicViewSwitcher,$state,globalService) {

    $scope.total = 0;

    $scope.user = $cookieStore.get('userInfo');
    $scope.payList = [];
    $scope.addressList = [];
    $scope.address = "";
    $scope.addressId = null;
    $scope.cartInfo = JSON.parse($stateParams.cartInfo);
    $scope.total = $scope.cartInfo.totalPrice;

    $scope.addressChoosed = 0;

    console.log($scope.cartInfo);

    /*//获取支付类型
     globalService.commonGet(TigerConfig.api.getPayList).then(function(result){
     if(result.code == 0){
     console.log("支付类型::");
     console.log(result);
     $scope.payList = result.data;
     }
     },function(error){
     console.log("请求失败！");
     console.log(error);
     });*/

    $scope.request = {
      addressList : function(){
        globalService.commonGet(TigerConfig.api.addressList+"?uid="+$scope.user.uid).then(function(result){
          if(result.code == 0){
            console.log("地址列表::");
            console.log(result);
            $scope.addressList = result.data;
            for(var key in $scope.addressList){
              if($scope.addressList[key].pdefault == 1){
                $scope.address = $scope.addressList[key].addressName+$scope.addressList[key].address;
                $scope.addressId = $scope.addressList[key].id;
                $scope.addressList[key].choosed = 1;
              }else{
                $scope.addressList[key].choosed = 0;
              }
            }
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      },
      orderByCart : function(param){
        globalService.commonPost(TigerConfig.api.orderByCart,param).then(function(result){
          console.log("提交订单::");
          console.log(result);
          if(result.code == 0){
            // location.href = "#/info";
            //$cookieStore.put('orderJson',null);
            $ionicViewSwitcher.nextDirection('forward');
            //$state.go('pay-shortcuts');
            $state.go('info');
          }else{
            alert(result.mes);
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      }
    }

    //获取地址信息  85c69c815824bf95
    $scope.request.addressList();

    //提交订单
    $scope.submitOrder = function(){
      if($scope.addressId == null){
        alert("请先选择收货地址");
      }else{
        var param = {
          buyerid:$scope.user.uid,
          orderAddressReq:{id:$scope.addressId},
          orderform:constant.CLIENTAGENT,
          carids:$scope.cartInfo.cartIds
        }


        console.log(param);
        $scope.request.orderByCart(param);

      }
    }

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.request.addressList();
      $scope.$broadcast("scroll.refreshComplete");
    }

    $scope.chooseAddress = function(id){
      for (var key in $scope.addressList) {
        if ($scope.addressList[key].id == id) {
          $scope.address = $scope.addressList[key].addressName + $scope.addressList[key].address;
          $scope.addressId = $scope.addressList[key].id;
          $scope.addressList[key].choosed = 1;
        }else{
          $scope.addressList[key].choosed = 0;
        }
      }

      $scope.addressChoosed = 0;
    }

    $scope.showAddress = function(){
      $scope.addressChoosed = 1;
    }

  })

})();
