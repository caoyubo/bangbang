/**
 * Created by blank on 16-3-31.
 * home controller
 */

(function() {
    "use strict";
    TigerController.controller('DashCtrl', function($scope) {})
        .controller('ChatsCtrl', function($scope, Chats) {
            $scope.chats = Chats.all();
            $scope.remove = function(chat) {
                Chats.remove(chat);
            };
        })
        .controller('ChatDetailCtrl', function($scope,$stateParams, Chats) {
            $scope.chat = Chats.get($stateParams.chatId);
        })
        /*µÇÂ½*/
        .controller('isLoginCtrl', function($scope,$rootScope,$cookieStore,$stateParams,$ionicViewSwitcher,$state, publicFunction) {
            $scope.isLogin = function(url){
                var userInfo = $cookieStore.get('userInfo');
                publicFunction.isLogin(url,userInfo,$ionicViewSwitcher,$state,{back:'tab.user'});
                /*if(userInfo == undefined || userInfo==null){
                 $ionicViewSwitcher.nextDirection('forward');
                 $state.go('login');
                 }else{
                 // $ionicViewSwitcher.nextDirection('forward');
                 $state.go(url);
                 }*/
            }
        })
        .controller('AccountCtrl', function($scope) {
            $scope.settings = {
                enableFriends: true
            };
        });

})();