/**
 * Created by ljm on 2016/3/14.
 */

(function() {
    "use strict";

    var car_info = {};
    var has_car  = false;
    var store_info = {};
    var f = false;
    TigerController.controller('storeRegisterCtrl',function($scope,$stateParams,$ionicViewSwitcher,$state,globalService,$cookieStore,publicFunction,$ionicPopup,Upload) {
        $scope.logo = 'img/store-img.jpg';
        $scope.imgUrl = TigerConfig.imgUrl;
        $scope.logo2 = '';  //上传图片的完整地址
        $scope.upload_info = {uploading:false,percent:0}

        //上传图片
        $scope.upload = function (file) {
            $scope.fileInfo = file;
            $scope.upload_info.uploading = true;
            $scope.upload_info.percent = 0;
            Upload.upload({
                //服务端接收
                url: '/imageUpload',
                //上传的同时带的参数
                data: { 'username': $scope.username },
                file: file
            }).progress(function (evt) {
                //进度条
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progess:' + progressPercentage + '%' );
                $scope.upload_info.percent = progressPercentage;
            }).success(function (data, status, headers, config) {
                //上传成功
                if(data.code == 0){
                    $scope.logo =  $scope.imgUrl+data.data;
                    $scope.logo2 = data.data;
                }else{
                    alert(data.mes)
                }
                $scope.upload_info.uploading = false;
            }).error(function (data, status, headers, config) {
                alert('上传失败');
                $scope.upload_info.uploading = false;
            });
        };

        $scope.user = $cookieStore.get('userInfo');
        $scope.isLogin = function(url){
            publicFunction.isLogin(url,$scope.user,$ionicViewSwitcher,$state,{back:'store-register'});
        };
        $scope.car_info = {title:'确认银行卡信息'};
        $scope.store_info = {};


        $scope.bankCardInfoReq = {
            custCode: $scope.user.uid,
            bankNum: "",
            bankName: "",
            bankPhone: ""
        };
        $scope.accountBankReq = {
            operatetype: "",
            password: ""
        };
        $scope.favor = {isChecked:false}

        //有无开店铺
        globalService.commonGet(TigerConfig.api.hasShop+"?uid="+$scope.user.uid).then(function(result){
            console.log('是否开店：',result)
            if(result.code == '-1'){
                $ionicPopup.alert({
                    title : '您已经开过店了',
                    okText : '返回'
                }).then(function(){
                    $state.go('tab.home');
                })
            }else if(result.code==0){
            }
        },function(error){
            console.log("请求失败！");
            console.log(error);
        })

        //判断有无绑定银行卡
        var params = {
            operatetype:'query',
            bankCardInfoReq : $scope.bankCardInfoReq,
            password : ''
        };
        globalService.commonPost(TigerConfig.api.diamondOperate,params).then(function(result){
            console.log('result',result)
            if(result.data != "该用户没有绑定银行卡" ){
                $scope.bankCardInfoReq = JSON.parse(result.data);
                $scope.bankCardInfoReq.custCode = $scope.user.uid;
                $scope.noCard = false;
                $scope.car_info.title = '确认银行卡信息';
                $('#carForm input').attr('readonly','readonly')
            }else{
                $scope.noCard = true;
                $scope.car_info.title = '绑定银行卡';

            }

        },function(error){
            console.log("请求失败！");
            console.log(error);
        })

        $scope.request = {
            operate: function (operatetype,myForm) {  //设置银行卡的操作类型 请求
                if(operatetype == 'bind' && !myForm.$valid){
                    $ionicPopup.alert({
                        title: '请填写完整信息',
                        okText: '确认',
                    });
                    return ;
                }
                $scope.accountBankReq.operatetype = operatetype;
                var param = {
                    operatetype: $scope.accountBankReq.operatetype,
                    password: $scope.accountBankReq.password,
                    bankCardInfoReq: $scope.bankCardInfoReq
                }
                globalService.commonPost(TigerConfig.api.diamondOperate, param).then(function (result) {
                    console.log("银行卡操作::");
                    console.log(result);
                    console.log(operatetype);
                    if (result.code == "0") {
                        switch (operatetype) {
                            case 'query': //查询
                                //  var queryData=JSON.parse(result.data);
                                if (typeof(result.data) == 'string') {
                                    $scope.noCard = true;
                                    if (result.data == '该用户没有绑定银行卡') {
                                        console.log('11');
                                    } else {
                                        $scope.noCard = false;
                                        $scope.bankCardInfoReq = JSON.parse(result.data);
                                    }
                                } else {
                                    console.log(11);
                                    $scope.noCard = false;
                                    $scope.bankCardInfoReq = JSON.parse(result.data);
                                }
                                break;
                            case 'update': //更新
                                $ionicPopup.confirm({
                                    title: result.data,
                                    cancelText:'取消',
                                    okText: '确认',
                                }).then(function (res) {
                                    console.log(res);
                                    if(res == true){
                                        location.href='#/card'
                                    }
                                })
                                break;
                            case 'cancel': //解绑
                                $ionicPopup.confirm({
                                    title: result.data,
                                    cancelText:'取消',
                                    okText: '确认',
                                }).then(function (res) {
                                    if(res == true){
                                        location.href='#/card'
                                    }
                                })
                                break;
                            case 'bind'://绑卡
                                $scope.noCard = false;
                                $ionicPopup.alert({
                                    title: result.data,
                                    okText: '确认',
                                }).then(function (res) {
                                    $state.go('store-register2');

                                })
                                break;
                        }
                    } else {
                        $ionicPopup.alert({
                            title: result.mes,
                            okText: '确认',
                        })
                    }
                }, function (error) {
                    console.log("查询银行卡失败！");
                    console.log(error);
                    $ionicPopup.alert({
                        title: error,
                        okText: '确认',
                    })
                })
            },
            next : function(){
                $state.go('store-register2');
            },

            addStore : function(myForm){  //添加商店
                if(!myForm.$valid){
                    $ionicPopup.alert({
                        title: '请填写完整信息',
                        okText: '确认',
                    });
                    return ;
                }
                if(!$scope.logo2){
                    $ionicPopup.alert({
                        title: '请上传商店logo',
                        okText: '确认',
                    });
                    return ;
                }
                /*if(!$scope.favor.isChecked){
                 $ionicPopup.alert({
                 title: '请同意协议',
                 okText: '确认',
                 });
                 return ;
                 }*/
                var param       = $scope.store_info;
                param.appId     = TigerConfig.appId;
                param.userId    = $scope.user.uid;
                param.logo      = $scope.logo2;
                globalService.commonPost(TigerConfig.api.addStore, param).then(function (result) {
                    if (result.code == "0") {
                        $ionicPopup.alert({
                            title: result.mes,
                            okText: '确认',
                        }).then(function (res) {
                            if(res == true){
                                $state.go('tab.home');
                            }
                        })
                    }
                })
            }
        }


    });

})();



