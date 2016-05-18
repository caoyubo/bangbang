/**
 * Created by ljm on 2016/3/8.
 */

(function() {
    "use strict";

    TigerController.controller('businessCenterCtrl', function ($scope, $cookieStore, $ionicActionSheet, $stateParams, $ionicViewSwitcher, $state, globalService,$ionicPopup) {

        $scope.shopid = 0;
        $scope.user = $cookieStore.get('userInfo');

        $scope.request = {
            //商品列表
            goodsList : function(){
                globalService.commonGet(TigerConfig.api.myProxyGoodsList+"?uid="+$scope.user.uid).then(function(result){
                    console.log(result)
                    if(result.code == '0'){
                        $scope.goodsList = result.data.list;
                    }
                },function(error){
                    console.log("请求失败！");
                    console.log(error);
                })
            },

            //是否有开店
            hasShop : function(){
                globalService.commonGet(TigerConfig.api.hasShop+"?uid="+$scope.user.uid).then(function(result){
                    console.log('是否开店：',result)
                    $scope.hasShop = result;
                },function(error){
                    console.log("请求失败！");
                    console.log(error);
                })
            },

            //店铺信息
            shopInfo : function(){
                globalService.commonGet(TigerConfig.api.shopInfo+"?uid="+$scope.user.uid).then(function(result){
                    console.log('店铺信息：',result)
                    $scope.shopInfo = result.data
                },function(error){
                    console.log("请求失败！");
                    console.log(error);
                })
            },

            //解绑
            unbind : function(){
                globalService.commonGet(TigerConfig.api.unBindShop+"?uid="+$scope.user.uid).then(function(result){
                    console.log('解绑:',result)
                    if(result.code == 0){
                        $ionicPopup.alert({
                            title : '成功解绑!',
                            okText  : '确定'
                        }).then(function(){
                            $state.reload();
                        })
                    }else{
                        $ionicPopup.alert({
                            title : result.mes,
                            okText  : '确定'
                        })
                    }

                },function(error){
                    console.log("请求失败！");
                    console.log(error);
                })
            },

            //个人回应邀请
            agree : function(id,state){
                globalService.commonGet(TigerConfig.api.inviteVerify+"?uid="+id+"&state="+state).then(function(result){
                    console.log('个人回应邀请:',result)
                    if(result.code == 0){
                        $ionicPopup.alert({
                            title : '成功!',
                            okText  : '确定'
                        }).then(function(){
                            $state.reload();
                        })
                    }else{
                        $ionicPopup.alert({
                            title : result.mes,
                            okText  : '确定'
                        })
                    }

                },function(error){
                    console.log("请求失败！");
                    console.log(error);
                })
            },
        }

        $scope.request.goodsList()
        $scope.request.shopInfo();


    })

})();

