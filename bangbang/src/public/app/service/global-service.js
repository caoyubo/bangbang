/**
 * <p>系统模块服务
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
TigerService
  .provider("globalService", function(){
  this.$get = function($http, $q , baseService) {
    return {
      /**
       * commonGet
       */
      commonGet: function(url,data,defaultErrorHandle){
        console.log(TigerConfig.url+url);
        defaultErrorHandle = defaultErrorHandle || true;
        return baseService.webRequest(TigerConfig.url+url,data,TigerConfig.requestMethod.GET,defaultErrorHandle);
      },
      commonGetTest: function(url,data){
        return baseService.webRequest(url,data,TigerConfig.requestMethod.GET);
      },
      /**
       * commonPost
       */
      commonPost: function(url,data,defaultErrorHandle){
        console.log(TigerConfig.url+url);
        defaultErrorHandle = defaultErrorHandle || true;
        return baseService.webRequest(TigerConfig.url+url,data,TigerConfig.requestMethod.POST,defaultErrorHandle);
      }

    };
  };
});






