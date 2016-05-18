/**
 * Created by ljm on 2016/1/28.
 */

(function() {
  "use strict";

  TigerController.controller('loginCtrl',function($scope,$cookieStore,$ionicBackdrop,$ionicViewSwitcher,$state,globalService,$ionicPopup,$stateParams) {
    $scope.user = {
      username:"",
      passwd:""
    }
    $scope.backdrop = false;
    $scope.backUrl = $stateParams.back ;

    $scope.login = function(userForm){
      if(userForm.$valid){
        $scope.backdrop = true; //点击登录后锁屏
        var params = $scope.user;
        globalService.commonPost(TigerConfig.api.loginPost,params).then(function(result){
          console.log(result);

          $cookieStore.put('apihost',result.apihost);//保存用户信息到cookie

          //登录成功
          if(result.r == 1){
            $scope.backdrop = false;
            $cookieStore.put('userInfo',result.data);//保存用户信息到cookie
            //获取推荐码
            globalService.commonGet(TigerConfig.api.getUserInfo+"?uid="+result.data.uid).then(function(data){
              console.log("==============获取用户信息:");
              console.log(data);

              if(data.data.code != undefined ||data.data.code !=''||data.data.code != null){
                //记录推荐码
                //$rootScope.tjcode = data.data.code;
                $cookieStore.put("tjcode",data.data.code);
              }

              console.log($scope.backUrl)
              if($scope.backUrl){
                //location.href = $scope.backUrl;
                $state.go('tab.user');
              }else{
                $state.go('tab.user');
              }

            },function(err){
              console.log("获取用户信息失败！！");
            });
          }else{
            $scope.backdrop = false;
            $ionicPopup.alert({
              title : result.errmsg,
              okText : '确定'
            })
          }
        },function(error){
          $scope.backdrop = false;
          $scope.backdrop = false;
          $ionicPopup.alert({
            title : '登录失败',
            okText : '确定'
          })
        })
      }else{
        func.validate(userForm,['userName','userPasswd']);
        console.log("验证没通过哦！！");
      }
    };

    //显示密码
    $scope.pw_input_type = 'password';
    $scope.showPw = function(){
      if($scope.pw_input_type == 'password'){
        $scope.pw_input_type = 'text';
      }else{
        $scope.pw_input_type = 'password';
      }
      console.log()
    }

  })

})();