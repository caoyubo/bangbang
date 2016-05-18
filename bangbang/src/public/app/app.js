// Ionic Starter App
/**
 * ionic APP 框架
 *
 */

var TagerApp = angular.module('starter', ['ionic','ngCookies','ngCordova','ngSanitize','ionic-native-transitions' ,
                                          'TigerApp.controller',
                                          'TigerApp.service',
                                          'TigerApp.directive',
                                          'TigerApp.filter']) ;

TagerApp.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      $rootScope.imgUrl = TigerConfig.imgUrl;
      $rootScope.siteName = TigerConfig.siteName;
  });
}) ;

TagerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {

  //裝載路由
  angular.forEach( TigerConfig.state , function (data , index , array) {
    $stateProvider.state( index , data );
  });
  //設置路由
  $urlRouterProvider.otherwise(TigerConfig.defaultstate);
  //設置路由方式爲不需要井號
  $locationProvider.html5Mode({enabled: true,requireBase: false});

});
