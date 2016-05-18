/**
 * service
 */
(function() {

  "use strict";

  TigerService
    .factory('publicFunction',function() {
      return {
        isLogin: function (url, user, $ionicViewSwitcher, $state, param) {
          var user = user;
          if (user == undefined || user == null) {
            $ionicViewSwitcher.nextDirection('forward');
            var p = {back: location.href};
            $state.go('login', p);
          } else {
            $ionicViewSwitcher.nextDirection('forward');
            if (param != undefined || param != null || param != "") {
              $state.go(url, param);
            } else {
              $state.go(url);
            }

          }
        },
        backNav: function (historyBack, $ionicViewSwitcher, $state) {
          $ionicViewSwitcher.nextDirection('back');
          $state.go(historyBack);
        },

        alert : function(option,timeout){
          var params = {};
          if(typeof option == 'string'){
            params = {
              title : option,
              okText : '确定'
            }
          }else{
            params =  option || {};
            if(!params.okText ){
              params.okText = '确定';
            }
            if(params.title ==undefined && params.template == undefined){
              params.title = '提醒';
            }
          }

          var dialog = $ionicPopup.alert(params);
          if(timeout){
            $timeout(function(){
              dialog.close();
            },timeout)
          }
          return dialog
        },

        confirm : function (option){
          var params = {};
          if(typeof option == 'string'){
            params = {
              title : option,
              okText : '确定',
              cancelText : '取消'
            }
          }else{
            params =  option || {};
            if(!params.okText ){
              params.okText = '确定';
            }
            if(!params.cancelText ){
              params.cancelText = '取消';
            }
            if(params.title ==undefined && params.template == undefined){
              params.title = '提醒';
            }
          }
          var dialog = $ionicPopup.confirm(params);
          return dialog
        },
      }
    })

  /**
   * 显示加载中 通常任何参数都不用传
   * @param show true为展示 false为隐藏。不传则根据上一次情况做处理
   * @param count 调用多少此show=false的情况才关闭。默认一次
   * @param timeout 自动关闭时间，<=0则不会自动关闭
   * @param template 加载中的样式
   */
    .factory('tigerLoading',function($timeout,$ionicLoading){
        var timer = null;
        var total_times = 0;
        var curr_times = 0;
        return function(show,count,timeout,template){
            timeout = timeout!=undefined ? timeout : TigerConfig.timeout;
            show = show!=undefined ? show : (timer ? false : true);
            if(show ){
                total_times = count || 0;
                curr_times = 0;
                if(timer){
                    $timeout.cancel(timer)
                    timer = null;
                }
                $ionicLoading.show({
                    template: template || ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
                });

                if(timeout>0){
                    timer = $timeout(function(){
                        $ionicLoading.hide();
                        timer = null;
                    },timeout * 1000);
                }
            }else{
                curr_times++;
                if(curr_times >= total_times){
                    $timeout.cancel(timer);
                    timer = null;
                    $ionicLoading.hide();
                    curr_times = 0;
                }
            }
        }
    })
})();