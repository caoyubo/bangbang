/**
 * Created by ljm on 2016/3/18.
 */

(function() {
    "use strict";

    TigerController.controller('orderCtrl', function ($scope, $cookieStore, $ionicActionSheet, $timeout, globalService, $stateParams, $ionicPopup) {
        $scope.order = {}
        $scope.orderList = [];
        $scope.imgUrl = TigerConfig.imgUrl;
        $scope.user = $cookieStore.get('userInfo');
        $scope.state = null;
        $scope.type = 0;
        $scope.moreDataCanBeLoaded = true;
        $scope.order_type = 0;  //订单类型 0全部 1 活动 2翡翠 9正常
        $scope.select1 = '';
        //订单状态
        $scope.state = $stateParams.state || null;
        var orderListFun = $scope.orderListFun = {
            currentPage: 1,
            execute:false,
            moredata: false,
            doRefresh:function() {  //下拉刷新
                $scope.$broadcast("scroll.refreshComplete");
            },
            loadMore:function(status){
                //获取订单列表
                //  orderListFun.orderList($scope.state);
                var orderStatus= $scope.state;
                if (orderStatus != 0 ) {
                    console.log(orderStatus);
                    var param = {
                        uid: $scope.user.uid,
                        currentPage: orderListFun.currentPage,
                        pageSize: constant.PAGESIZE,
                    };
                    if(orderStatus==-1){
                        param.orderStatus=null;
                    }else{
                        param.orderStatus=orderStatus;
                    }
                } else {
                    var param = { //待评价
                        uid: $scope.user.uid,
                        currentPage: orderListFun.currentPage,
                        evaluationState: 0,
                        pageSize:constant.PAGESIZE,
                        orderStatus: 40,
                    };
                }
                console.log(param);
                http(param);
                orderListFun.currentPage += 1;
            },
            pay1: function (pay_id) { //正常支付
                var param = {
                    "uid": $scope.user.uid,
                    "terminalflag": "mobile",
                    "billid": pay_id,
                    "callbackmallurl": "http://haoyi.yn.com:45000/index"
                };
                globalService.commonPost(TigerConfig.api.getPayUrl, param).then(function (result) {
                    console.log(result);
                    if (result.code == 0) {
                        var payParam = result.data;
                        console.log(payParam);
                        location.href = payParam.url;
                    } else {
                        $ionicPopup.alert({
                            title: result.data.mes || '请求失败！',
                            okText: '确定'
                        });
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                })
            },
            pay2: function (pay_id) { //翡翠商品支付
                globalService.commonGet(TigerConfig.api.getGiftPayUrl + '?id=' + pay_id).then(function (result) {
                    console.log(result);
                    if (result.code == 0) {
                        var payParam = result.data;
                        //console.log(payParam);
                        //location.href=payParam.url;
                        $ionicPopup.alert({
                            title: result.mes || '请求失败！',
                            okText: '确定'
                        });
                    } else {
                        $ionicPopup.alert({
                            title: result.data.mes || '请求失败！',
                            okText: '确定'
                        });
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                })
            },
            getOrderByState:function(state){ //state 订单状态
                console.log('订单状态：' + state);
                if (state !== null) {
                    $scope.state = state;
                }
                state = state == -1 ? null : $scope.state;
                state = state == -1 ? null : state;
                $scope.orderList = [];
                orderListFun.currentPage =1;
                orderListFun.loadMore(state);
            },
            getOrderByType:function(m){ //筛选
                $scope.type = m.type;
                $scope.orderList = [];
                console.log($scope.type);
                console.log($scope.state);
                if ($scope.state != 0) {
                    var param = {
                        uid: $scope.user.uid,
                        orderStatus: $scope.state,
                        currentPage: orderListFun.currentPage,
                        pageSize: constant.PAGESIZE,
                    };
                    if($scope.type!=0){
                        param.payType = $scope.type;
                    }
                    if($scope.state==-1){
                        param.orderStatus=null;
                    }else{
                        param.orderStatus=$scope.state;
                    }
                } else {
                    var param = {
                        uid: $scope.user.uid,
                        currentPage: orderListFun.currentPage,
                        evaluationState: 0,
                        pageSize: constant.PAGESIZE,
                        orderStatus: 40,
                    };
                }
                console.log(param);
                http(param);
            },
            pay_act:function(pay_info,billsResp){
                console.log(pay_info);
                var pay_id = billsResp.id;
                console.log(pay_id);
                if (pay_info.paytype == 9) {
                    orderListFun.pay1(pay_id);
                } else if (pay_info.paytype == 2) {
                    orderListFun.pay2(pay_id);
                } else {
                    $ionicPopup.alert({
                        title: '该订单支付类型暂时不支持!',
                        okText: '确定'
                    })
                }
            }
        }
        function http(param) { //请求
            globalService.commonPost(TigerConfig.api.order_list_page, param).then(function (result) {
                console.log("订单列表::");
                console.log(result);
                if (result.code == 0) {
                    $scope.order = result.data;
                    if (result.data.list != undefined && result.data.list != null) {
                        for (var key in result.data.list) {
                            $scope.orderList.push(result.data.list[key]);
                        }
                        if(result.data.nextPage!=0){
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }else{
                            orderListFun.moredata = true;
                        }
                    }
                }
            }, function (error) {
                console.log("请求失败！");
                console.log(error);
            });
        }


    });

})();
