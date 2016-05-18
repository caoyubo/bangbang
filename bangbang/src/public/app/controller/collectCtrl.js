/**
 * Created by ljm on 2016/3/23.
 */

(function() {
  "use strict";

  var sign = 0;
  TigerController.controller('collectCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$timeout,$state,globalService,$ionicPopup) {

    $scope.user = $cookieStore.get('userInfo');

    $scope.sign = sign;
    $scope.collectGoods = {};
    $scope.collectStore = {};
    $scope.collectGoodsList = [];
    $scope.collectStoreList = [];
    $scope.imgUrl = TigerConfig.imgUrl;
    $scope.moreDataCanBeLoaded = true;

    $scope.request = {
      collectList : function(ptype,currentPage){
        var param = {
          uid :$scope.user.uid,
          ptype : ptype,
          currentPage : currentPage,
          pageSize : TigerConfig.pageSize
        }
        globalService.commonPost(TigerConfig.api.collectList,param).then(function(result){
          console.log("我的收藏信息::");
          console.log(result);
          if(result != undefined){
            if(result.code != undefined && result.code == "0"){
              if(param.ptype == 0){
                $scope.collectGoods = result.data;
                if(result.data.list){
                  console.log(result.data.list);
                  for(var key in result.data.list){
                    $scope.collectGoodsList.push(result.data.list[key]);
                  }
                }
              }
              if(param.ptype == 1){
                $scope.collectStore = result.data;
                if(result.data.list){
                  for(var key in result.data.list){
                    $scope.collectStoreList.push(result.data.list[key]);
                  }
                }
              }

            }
          }
        },function(error){
          console.log("我的收藏失败！");
          console.log(error);
        })
      },
      collectDel : function(id){
        globalService.commonGet(TigerConfig.api.collectionDel+"?id="+id).then(function(result){
          console.log("取消收藏::");
          console.log(result);
          if(result != undefined){
            if(result.code != undefined && result.code == "0"){
              $ionicPopup.alert({
                title : result.mes,
                okText : '确定'
              }).then(function(res){
                $state.reload();
              })
            }else{
              $ionicPopup.alert({
                title : result.mes,
                okText : '确定'
              })
            }
          }
        },function(error){
          console.log("取消收藏失败！");
          console.log(error);
        })
      }
    }


    //收藏的商品
    $scope.request.collectList($scope.sign,1);

    $scope.myCollect = function(ptype){
      $scope.sign = ptype;
      sign = ptype;
      if(ptype == 0 && $scope.collectGoodsList.length<=0){
        $scope.request.collectList(ptype,1);
      }
      if(ptype == 1 && $scope.collectStoreList.length<=0){
        $scope.request.collectList(ptype,1);
      }
    }



    //上拉加载数据
    $scope.load_more = function(){
      //$scope.$broadcast("scroll.infiniteScrollComplete");
      if($scope.sign == 0){
        $timeout(function(){
          if($scope.collectGoods.hasNextPage){
            $scope.moreDataCanBeLoaded = true;
            $scope.request.collectList(0,(parseInt($scope.collectGoods.pageNum)+1));
            $scope.$broadcast("scroll.infiniteScrollComplete");
          }else{
            $scope.moreDataCanBeLoaded = false;
          }
        },500);
      }
      if($scope.sign == 1){
        $timeout(function(){
          if($scope.collectStore.hasNextPage){
            $scope.moreDataCanBeLoaded = true;
            $scope.request.collectList(1,(parseInt($scope.collectStore.pageNum)+1));
            $scope.$broadcast("scroll.infiniteScrollComplete");
          }else{
            $scope.moreDataCanBeLoaded = false;
          }
        },500);
      }
    }

    $scope.collect_del = function(id){
      $ionicPopup.confirm({
        title : '确定删除?',
        okText : '确定',
        cancelText : '取消'
      }).then(function(res){
        if(res){
          $scope.request.collectDel(id);
        }
      });

    };

    $scope.myHref = function(id,type){
      $ionicViewSwitcher.nextDirection('forward');
      if(type == 1){  //商品
        $state.go('detail', {'id': id});
      }else{          //商店
        $state.go('store', {'shopid': id});
      }

    }

  })

})();

