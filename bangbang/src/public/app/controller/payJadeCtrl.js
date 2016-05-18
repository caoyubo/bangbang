/**
 * Created by ljm on 2016/3/8.
 */

(function() {
  "use strict";

  TigerController.controller('payJadeCtrl',function($scope,$cookieStore,$ionicActionSheet,$stateParams,$ionicViewSwitcher,$state,globalService,$ionicPopup) {

    $scope.orderJson = $cookieStore.get('orderJson');
    console.log("orderJson::");
    console.log($scope.orderJson);

    $scope.specAndNum = $scope.orderJson.specAndNum;
    $scope.goodsInfo = $scope.orderJson.goodsInfo;
    $scope.imgUrl = TigerConfig.imgUrl;
    $scope.specInfo = {};
    $scope.total = 0;
    $scope.integral = {};
    $scope.addressChoosed = 0;


    // $cookieStore.put('orderJson',null);

    for(var key in $scope.goodsInfo.goods_spec){
      for(var i in $scope.goodsInfo.goods_spec[key].attributeValues){
        if($scope.goodsInfo.goods_spec[key].attributeValues[i].id == $scope.specAndNum.specId){
          $scope.specInfo = $scope.goodsInfo.goods_spec[key].attributeValues[i]
          console.log("specInfo::");
          console.log($scope.specInfo);
        }
      }

    }

    //计算总金额
    $scope.total = (parseFloat($scope.specInfo.shopprice)*parseInt($scope.specAndNum.goodsNum));


    $scope.user = $cookieStore.get('userInfo');
    $scope.payList = [];
    $scope.addressList = [];
    $scope.address = "";
    $scope.addressId = null;

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
      order : function(param){
        globalService.commonPost(TigerConfig.api.order_gift,param).then(function(result){
          console.log("提交订单::");
          console.log(result);
          if(result.code == 0){
            if(result.data.id != undefined && result.data.id != null&&result.data.id!=""){
              //创建订单成功后去支付
              console.log(result.data.id);
              $scope.request.orderPay(result.data.id);
            }
          }else{
            alert(result.mes);
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      },
      getJade : function(){
        globalService.commonGet(TigerConfig.api.findJade+"?uid="+$scope.user.uid).then(function(result){
          console.log("翡翠积分信息::");
          console.log(result);

          if(result != undefined){
            if(result.code != undefined && result.code == "0"){
              $scope.integral = (result.data==undefined||result.data==null)?{point:0}:result.data;
            }
          }
        },function(error){
          console.log("查询翡翠积分失败！");
          console.log(error);
        })
      },
      orderPay : function(id){
        globalService.commonGet(TigerConfig.api.order_pay+"?id="+id).then(function(result){
          console.log("翡翠订单支付::");
          console.log(result);
          if(result.code == 0){
            $ionicPopup.alert({
              title : '下单成功！',
              okText : '确认'
            }).then(function(){
              $ionicViewSwitcher.nextDirection('forward');
              $state.go('order');
            })
          }else{
            $ionicPopup.alert({
              title : result.mes || '失败',
              okText : '确认'
            })
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      }
    }

    //获取地址信息  85c69c815824bf95
    $scope.request.addressList();

    //获取翡翠积分信息
    $scope.request.getJade();

    //提交订单
    $scope.submitOrder = function(){
      if($scope.addressId == null){
        alert("请先选择收货地址");
        return;
      }
      if($scope.integral.freepoint != undefined && $scope.integral.freepoint != null){
        if(parseFloat($scope.integral.freepoint)<parseFloat($scope.total)){
          alert("翡翠积分不够，无法购买");
          return;
        }
      }
      if($scope.integral.freepoint == undefined || $scope.integral.freepoint == null){
        alert("翡翠积分不够，无法购买");
        return;
      }

      var param = {
        buyerid:$scope.user.uid,
        orderAddressReq:{id:$scope.addressId},
        orderform:constant.CLIENTAGENT,
        specIds:[{id: $scope.specAndNum.specId ,goodsnum:$scope.specAndNum.goodsNum}]
      }
      console.log(param);
      $scope.request.order(param);
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
