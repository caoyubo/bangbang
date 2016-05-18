/**
 * Created by ljm on 2016/3/19.
 */

(function() {
    "use strict";

    TigerController.controller('addressEditCtrl', function ($scope, $ionicActionSheet, $cookieStore, $ionicModal, $stateParams, $ionicViewSwitcher, $state, globalService) {

        $scope.address = {};
        $scope.choice = null;
        $scope.id = $stateParams.id;  //获取地址id
        $scope.user = $cookieStore.get('userInfo');

        console.log("$scope.id::" + $scope.id);
        $scope.country = []; //国家
        $scope.province = []; //省
        $scope.city = [];   //市
        $scope.district = [];  //区
        $scope.isNoChild = false;
        $scope.setDefault = {
            checked: false
        }

        $scope.addressInfo = {
            appId: TigerConfig.appId,
            uid: $scope.user.uid,
            consignee: "",
            email: "",
            countryId: "",
            country: "",
            provinceId: "",
            province: "",
            cityId: "",
            city: "",
            districtId: "",
            district: "",
            address: "",
            zipCode: "",
            telephone: "",
            mobile: "",
            signBuild: "",
            pdefault: 0
        }

        $scope.request = {
            findAllCountry: function () {
                globalService.commonGet(TigerConfig.api.findAllCountry).then(function (result) {
                    if (result.code == 0) {
                        console.log("获取所有国家的信息::");
                        console.log(result);
                        $scope.country = result.data;
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                });
            },

            findByPid: function (rankId, pid) {
                globalService.commonGet(TigerConfig.api.findByPid + "?pid=" + pid).then(function (result) {
                    if (result.code == 0) {
                        console.log("根据上级id查找下级地区信息::");
                        console.log(result);
                        if (rankId == 1) {
                            $scope.province = result.data;
                            $scope.city = [];   //市
                            $scope.district = [];  //区

                        }
                        if (rankId == 2) {
                            $scope.city = result.data;
                            $scope.district = [];  //区
                        }
                        if (rankId == 3) {
                            $scope.district = result.data;
                        } else {
                            if (result.data.length == 0) {
                                $scope.isNoChild = true;
                                $scope.closeModal(); //如果返回的是最后一级区域，关闭model
                            }
                        }

                        $scope.selectedAddress(rankId, pid);
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                });
            },
            addAddress: function (param) {
                globalService.commonPost(TigerConfig.api.addAddress, param).then(function (result) {
                    if (result.code == 0) {
                        alert(result.mes);
                        console.log("添加地址成功::");
                        console.log(result);

                        $ionicViewSwitcher.nextDirection('back');
                        $state.go('address');
                    } else {
                        alert(result.mes);
                    }
                }, function (error) {
                    alert("添加地址失败！！");
                    console.log("请求失败！");
                    console.log(error);
                });
            },
            updateAddress: function (param) {
                // addressForm.$valid
                globalService.commonPost(TigerConfig.api.editAddress, param).then(function (result) {
                    console.log("修改地址::");
                    console.log(result);
                    if (result.code == 0) {
                        console.log("修改地址::");
                        console.log(result);
                        alert(result.mes);
                        $ionicViewSwitcher.nextDirection('back');
                        $state.go('address');
                    } else {
                        alert(result.mes);
                    }
                }, function (error) {
                    alert("修改地址失败！");
                    console.log("修改地址失败！");
                    console.log(error);
                });
            },
            deleteAddress: function () {
                globalService.commonGet(TigerConfig.api.deleteAddress + "?id=" + $scope.id).then(function (result) {
                    if (result.code == 0) {
                        alert(result.mes);
                        console.log("删除地址成功::");
                        console.log(result);

                        $ionicViewSwitcher.nextDirection('back');
                        $state.go('address');
                    } else {
                        alert(result.mes);
                        console.log(result);
                    }
                }, function (error) {
                    alert("删除地址失败！！");
                    console.log("请求失败！");
                    console.log(error);
                });
            },
            findAddressById: function () {
                globalService.commonGet(TigerConfig.api.findAddressById + "?id=" + $scope.id).then(function (result) {
                    console.log("根据id获取地址信息::");
                    console.log(result);
                    if (result.code == 0) {
                        console.log("根据id获取地址信息::");
                        console.log(result);
                        $scope.addressInfo = result.data;
                        if ($scope.addressInfo.pdefault == '0') {
                            $scope.setDefault.checked = false;
                        } else {
                            $scope.setDefault.checked = true;
                        }
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                });
            }

        }

        if ($scope.id != undefined || $scope.id != null) {
            //根据id获取地址信息
            $scope.request.findAddressById();
        }

        $scope.findNextArea = function (rankId, pid) {
            console.log("上级地区Id::");
            console.log(pid);
            //根据上级id查找下级地区信息
            $scope.request.findByPid(rankId, pid);

        }

        //查找选中的地区
        $scope.selectedAddress = function (rankId, pid) {
            if (rankId == 1) {
                for (key in $scope.country) {
                    if ($scope.country[key].id == pid) {
                        $scope.addressInfo.country = $scope.country[key].regionName;
                        $scope.addressInfo.countryId = $scope.country[key].id;
                    }
                }
            }

            if (rankId == 2) {
                for (key in $scope.province) {
                    if ($scope.province[key].id == pid) {
                        $scope.addressInfo.province = $scope.province[key].regionName;
                        $scope.addressInfo.provinceId = $scope.province[key].id;
                    }
                }
            }

            if (rankId == 3) {
                for (key in $scope.city) {
                    if ($scope.city[key].id == pid) {
                        $scope.addressInfo.city = $scope.city[key].regionName;
                        $scope.addressInfo.cityId = $scope.city[key].id;
                    }
                }
            }

            if (rankId == 4) {
                for (key in $scope.district) {
                    if ($scope.district[key].id == pid) {
                        $scope.addressInfo.district = $scope.district[key].regionName;
                        $scope.addressInfo.districtId = $scope.district[key].id;
                    }
                }
            }
        }

        //保存并使用地址
        $scope.addAddress = function (addressForm) {
            console.log(addressForm.$valid);
            if (addressForm.$valid) {
                if ($scope.setDefault.checked == true) {
                    $scope.addressInfo.pdefault = 1
                } else {
                    $scope.addressInfo.pdefault = 0
                }
                var param = $scope.addressInfo;
                console.log(param);
                $scope.request.addAddress(param);
            }else{
                func.validate(addressForm,['userName','userPasswd']);
                console.log("验证没通过哦！！");
            }
        }

        //修改地址
        $scope.updateAddress = function () {
            if ($scope.setDefault.checked == true) {
                $scope.addressInfo.pdefault = 1
            } else {
                $scope.addressInfo.pdefault = 0
            }
            var param = $scope.addressInfo;
            console.log(param);
            $scope.request.updateAddress(param);
        }

        //删除地址
        $scope.deleteAddress = function () {
            $scope.request.deleteAddress();
        }

        //获取所有国家的信息
        $scope.request.findAllCountry();

        $ionicModal.fromTemplateUrl("address-modal.html", {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };

    })

})();



