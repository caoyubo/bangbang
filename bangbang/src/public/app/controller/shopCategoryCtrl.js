/**
 * Created by marlowe on 2016/4/28.
 */

(function() {
    "use strict";

    TigerController.controller('shopCategoryCtrl', function ($scope, $stateParams, $ionicViewSwitcher, $state, globalService) {
        $scope.shopid = $stateParams.shopid;  //获取店铺id
        console.log($scope.shopid);
        $scope.imgUrl = TigerConfig.imgUrl;
        $scope.storeInfo = {};
        $scope.goodsList = [];

        $scope.myHref = function (id) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('detail', {'id': id});
        }

        //查询指定商户所有商品分类列表
        globalService.commonGet(TigerConfig.api.findByShopId + "?shopid=" + $scope.shopid).then(function (result) {
            if (result.code == 0) {
                console.log("店铺商品分类列表::");
                console.log(result);
                $scope.storeInfo = result.data;
            } else {
                console.log("店铺商品分类列表::");
                console.log(result.mes);
            }
        }, function (error) {
            console.log("请求失败！");
            console.log(error);
        });


        $scope.goodsname = "";  //商品名称
        $scope.categoryId = ""; //商品分类Id
        $scope.goods = {};
        $scope.imgUrl = TigerConfig.imgUrl;
        $scope.moreDataCanBeLoaded = true;
        if ($stateParams.categoryId) {
            $scope.categoryId = $stateParams.categoryId;
        }
        var shop = $scope.shop = {
            moredata: false,
            currentPage:1,
            load_more :function () {    //上拉加载数据
                $scope.$broadcast('scroll.refreshComplete');
            },
            findGoods: function () {  //商品列表
                var param = {
                    goodsname: $scope.goodsname,
                    goodsid: $scope.shopid,
                    brandid: "",
                    shopid: "",
                    currentPage: shop.currentPage,
                    pageSize: constant.PAGESIZE
                }
                console.log(param);
                http(param);
                shop.currentPage += 1;
            }
        }
        function http(param){  //请求
            globalService.commonPost(TigerConfig.api.findGoodsPost, param).then(function (result) {
                console.log("goodsList::");
                console.log(result);
                if (result.code == "0") {
                    $scope.goods = result.data;
                    if (result.data.list != undefined && result.data.list != null) {
                        for (var key in result.data.list) {
                            $scope.goodsList.push(result.data.list[key]);
                        }
                    }
                    if (param.currentPage < result.data.lastPage) {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    } else {
                        shop.moredata = true;
                    }
                }
            }, function (error) {
                console.log("搜索商品失败！");
                console.log(error);
            })
        }


        /*     if ($scope.categoryId != "" || $scope.categoryId != undefined || $scope.categoryId != null) {
         shop.findGoods(1);
         }

         $scope.search = function () {
         shop.findGoods(1);
         }
         */





    })

})();




