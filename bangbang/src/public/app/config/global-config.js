/**
 * Created by blank 2016-03-31 .
 * tiger 全局變量
 */

/**
 * 框架通用參數
 * @type {{}}
 */
var TigerEnv = {
    'templatePath' : '/app/templates/'
};
/**
 * 配置
 */
var TigerConfig ={
    siteName : 'tiger',
    url :"",  //http://hyapi.yn.com:42000/
    //imgUrl :"http://imagehaoyi.nzlm.cn/",
    imgUrl :"http://image.hy.com/",
    registerUrl :"http://172.16.110.150:8100/#/register",
    appId : "mall",
    pageSize : 10,
    clientAgent : 'mobile',        //客户端标志 pc 或 mobile 或其他类型

    timeout : 10,

    'requestMethod' :{
        POST    :"POST",
        GET     :"GET",
        PUT     :"PUT",
        DELETE  :"DELETE",
        HEAD    :"HEAD",
        OPTION  :"OPTION"
    },
    'defaultstate' : '/tab/home',
    'state' : {
        'tab': {
            url: '/tab',
            abstract: true,
            templateUrl: TigerEnv.templatePath+'tabs.html',
            controller: 'isLoginCtrl',
            cache: false
        },
        'tab.home': {
            url: '/home',
            views: {
                'tab-home': {
                    templateUrl: TigerEnv.templatePath+'home.html',
                    controller: 'homeCtrl'
                }
            },
            cache: false
        },
        'tab.user' : {
            url: '/user',
            views: {
                'tab-user': {
                    templateUrl: TigerEnv.templatePath + 'user.html',
                    controller: 'userCtrl',

                }
            },
            cache: false
        },
        //分类
        'tab.category' : {
            url: '/category',
            views: {
                'tab-category': {
                    templateUrl: TigerEnv.templatePath + 'category.html',
                    controller: 'categoryCtrl'
                }
            },
            cache: false
        },
        //购物车
        'tab.find' : {
            url: '/find',
            views: {
                'tab-find': {
                    templateUrl: TigerEnv.templatePath + 'find.html',
                    controller: 'findCtrl'
                }
            },
            cache: false
        },
        //购物车
        'cart' : {
            url: '/cart/:back',
            templateUrl: TigerEnv.templatePath + 'cart.html',
            controller: 'cartCtrl',
            cache: false
        },
        // Each tab has its own nav history stack:
        //登录
        'login' : {
            url: '/login/:back',
            templateUrl: TigerEnv.templatePath + 'login.html',
            controller: 'loginCtrl',
            cache: false
        },
        //注册
        'register' : {
            url: '/register',
            templateUrl: TigerEnv.templatePath + 'register.html',
            controller: 'registerCtrl',
            cache: false
        },
        //提交订单
        'pay' : {
            url: '/pay',
            templateUrl: TigerEnv.templatePath + 'pay.html',
            controller: 'payCtrl',
            cache: false
        },
        //从购物车提交订单
        'pay-cart' : {
            url: '/pay-cart/:cartInfo',
            templateUrl: TigerEnv.templatePath + 'pay-cart.html',
            controller: 'payCartCtrl',
            cache: false
        },

        //提交订单
        'pay-jade' : {
            url: '/pay-jade',
            templateUrl: TigerEnv.templatePath + 'pay-jade.html',
            controller: 'payJadeCtrl',
            cache : false
        },
        //订单处理中......
        'info' : {
            url: '/info',
            templateUrl: TigerEnv.templatePath + 'info.html',
            controller: '',
            cache: false
        },


        //收货地址
        'address' : {
            url: '/address',
            templateUrl: TigerEnv.templatePath + 'address.html',
            controller: 'addressCtrl',
            cache: false
        },

        //收货地址
        'address-edit' : {
            url: '/address-edit/:id',
            templateUrl: TigerEnv.templatePath + 'address-edit.html',
            controller: 'addressEditCtrl',
            cache: false
        },
        //提交订单时选择收货地址
        'address-choose' : {
            url: '/address-choose',
            templateUrl: TigerEnv.templatePath + 'address-choose.html',
            controller: 'addressCtrl',
            cache: false
        },

        //搜索页
        'search' : {
            url: '/search',
            templateUrl: TigerEnv.templatePath + 'search.html',
            controller: '',
            cache: false
        },
        //商品详情
        'detail' : {
            url: '/detail/:id:back',
            templateUrl: TigerEnv.templatePath + 'detail.html',
            controller: 'detailCtrl',
            cache: false
        },
        //翡翠商品详情
        'detail-jade' : {
            url: '/detail-jade/:id',
            templateUrl: TigerEnv.templatePath + 'detail-jade.html',
            controller: 'detailJadeCtrl',
            cache: false
        },
        //我的订单
        'order' : {
            url: '/order/:state',
            templateUrl: TigerEnv.templatePath + 'order.html',
            controller: 'orderCtrl',
            cache: false
        },

        //订单详情
        'order-detail' : {
            url: '/order-detail/:id',
            templateUrl: TigerEnv.templatePath + 'order-detail.html',
            controller: 'orderDetailCtrl',
            cache: false
        },
        /*'order' : {
         url: '/order',
         templateUrl: TigerEnv.templatePath + 'order.html',
         controller: ''
         })*/

        //账户设置
        'set-account' : {
            url: '/set-account',
            templateUrl: TigerEnv.templatePath + 'set-account.html',
            controller: 'setAccountCtrl',
            cache: false
        },

        //推荐人列表
        'getReferences' : {
            url: '/getReferences',
            templateUrl: TigerEnv.templatePath + 'getReferences.html',
            controller: 'referencesCtrl',
            cache: false
        },

        //我的收藏
        'collect' : {
            url: '/collect',
            templateUrl: TigerEnv.templatePath + 'collect.html',
            controller: 'collectCtrl',
            cache : false
        },
        //商家中心
        'businessCenter' : {
            url: '/businessCenter',
            templateUrl: TigerEnv.templatePath + 'businessCenter.html',
            controller: 'businessCenterCtrl',
            cache: false
        },

        //我的假积分
        'my-fake-score' : {
            url: '/my-fake-score',
            templateUrl: TigerEnv.templatePath + 'my-fake-score.html',
            controller: 'myFakeScoreCtrl',
            cache: false
        },
        //我的积分
        'integral' : {
            url: '/integral',
            templateUrl: TigerEnv.templatePath + 'integral.html',
            controller: 'integralCtrl',
            cache: false
        },
        //提现
        'withdraw' : {
            url: '/withdraw',
            templateUrl: TigerEnv.templatePath + 'withdraw.html',
            controller: 'widthdrawCtrl',
            cache:'false'
        },
        //选择账户
        'chooseAccount' : {
            url: '/chooseAccount',
            templateUrl: TigerEnv.templatePath + 'chooseAccount.html',
            controller: '',
            cache: false
        },
        //钻石账单
        'diamond-bill' : {
            url: '/diamond-bill',
            templateUrl: TigerEnv.templatePath + 'diamond-bill.html',
            controller: 'diamondBillCtrl',
            cache:'false'
        },
        //积分账单
        'bill' : {
            url: '/bill',
            templateUrl: TigerEnv.templatePath + 'bill.html',
            controller: 'billCtrl',
            cache: false
        },
        //最近查看
        'recent-look' : {
            url: '/recent-look',
            templateUrl: TigerEnv.templatePath + 'recent-look.html',
            controller: '',
            cache: false
        },
        //售后服务
        'after-service' : {
            url: '/after-service',
            templateUrl: TigerEnv.templatePath + 'after-service.html',
            controller: '',
            cache: false
        },
        //我的任务
        'my-task' : {
            url: '/my-task',
            templateUrl: TigerEnv.templatePath + 'my-task.html',
            controller: '',
            cache: false
        },
        //我的推广用户
        'extension-user' : {
            url: '/extension-user',
            templateUrl: TigerEnv.templatePath + 'extension-user.html',
            controller: '',
            cache: false
        },
        //我的邀请码
        'code' : {
            url: '/code',
            templateUrl: TigerEnv.templatePath + 'code.html',
            controller: 'codeCtrl',
            cache: false
        },
        //积分充值
        'deposit' : {
            url: '/deposit',
            templateUrl: TigerEnv.templatePath + 'deposit.html',
            controller: 'depositCtrl',
            cache: false
        },

        //快速充值
        'deposit_2' : {
            url: '/deposit_2',
            templateUrl: TigerEnv.templatePath + 'deposit_2.html',
            controller: '',
            cache: false
        },

        //选择充值的账户
        'choose-account' : {
            url: '/choose-account',
            templateUrl: TigerEnv.templatePath + 'choose-account.html',
            controller: '',
            cache: false
        },

        //会员升级
        'upgrade' : {
            url: '/upgrade/:level',
            templateUrl: TigerEnv.templatePath + 'upgrade2.html',
            controller: 'upgradeCtrl',
            cache: false
        },

        //流水
        'luishui' : {
            url: '/luishui/:level',
            templateUrl: TigerEnv.templatePath + 'luishui.html',
            controller: 'luishuiCtrl',
            cache: false
        },
        //升级费用说明
        'introductions-cost' : {
            url: '/introductions-cost',
            templateUrl: TigerEnv.templatePath + 'introductions-cost.html',
            controller: '',
            cache: false
        },
        //选择积分
        'integral-choose' : {
            url: '/integral-choose',
            templateUrl: TigerEnv.templatePath + 'integral-choose.html',
            controller: 'integralChooseCtrl',
            cache: false
        },

        //店铺
        'store' : {
            url: '/store/:shopid',
            templateUrl: TigerEnv.templatePath + 'store.html',
            controller: 'storeCtrl',
            cache: false
        },

        //店铺 分类筛选
        'store-category' : {
            url: '/store-category/:shopid',
            templateUrl: TigerEnv.templatePath + 'store-category.html',
            controller: 'storeCategoryCtrl',
            cache: false
        },
        //分类商品查询
        'shop-category' : {
            url: '/shop-category/:shopid',
            templateUrl: TigerEnv.templatePath + 'shop-category.html',
            controller: 'shopCategoryCtrl',
        },

        //店铺搜索
        'store-search' : {
            url: '/store-search/:categoryId',
            templateUrl: TigerEnv.templatePath + 'store-search.html',
            controller: 'searchCtrl',
            cache: false
        },
        //开店
        'store-register' : {
            url: '/store-register',
            templateUrl: TigerEnv.templatePath + 'store-register.html',
            controller: 'storeRegisterCtrl',
            cache: false
        },

        //绑定支付
        'store-register2' : {
            url: '/store-register2',
            templateUrl: TigerEnv.templatePath + 'store-register2.html',
            controller: 'storeRegisterCtrl',
            cache: false
        },

        //选择快捷支付
        'pay-shortcuts' : {
            url: '/pay-shortcuts',
            templateUrl: TigerEnv.templatePath + 'pay-shortcuts.html',
            controller: 'payShortcutsCtrl',
            cache: false
        },
        //选择银行卡
        'bankcard-choose' : {
            url: '/bankcard-choose',
            templateUrl: TigerEnv.templatePath + 'bankcard-choose.html',
            controller: '',
            cache: false
        },
        //支付验证
        'pay-code' : {
            url: '/pay-code',
            templateUrl: TigerEnv.templatePath + 'pay-code.html',
            controller: '',
            cache: false
        },
        //绑定银行卡
        'card' : {
            url: '/card',
            templateUrl: TigerEnv.templatePath + 'card.html',
            controller: 'cardCtrl',
            cache: false
        },
        //绑定银行卡
        'card-edit' : {
            url: '/card-edit',
            templateUrl: TigerEnv.templatePath + 'card-edit.html',
            controller: 'cardEditCtrl',
            cache: false
        },

        //假积分兑换抢购
        'fake-score' : {
            url: '/fake-score',
            templateUrl: TigerEnv.templatePath + 'fake-score.html',
            controller: 'fakeScoreCtrl',
            cache: false
        },

        //假积分兑换商品提交订单
        'fake-score-pay' : {
            url: '/fake-scorepay',
            templateUrl: TigerEnv.templatePath + 'fake-score-pay.html',
            controller: '',
            cache: false
        },
        //预售
        'presale' : {
            url: '/presale',
            templateUrl: TigerEnv.templatePath + 'presale.html',
            controller: '',
            cache: false
        },
        //消息列表
        'message' : {
            url: '/message',
            templateUrl: TigerEnv.templatePath + 'message.html',
            controller: 'messageCtrl',
            cache: false
        },
        //消息详情
        'message-detail' : {
            url: '/message-detail/:id',
            templateUrl: TigerEnv.templatePath + 'message-detail.html',
            controller: 'messageDetailCtrl',
            cache: false
        },

        //活动
        'active' : {
            url: '/active',
            templateUrl: TigerEnv.templatePath + 'active.html',
            controller: '',
            cache: false
        },
        //账户与安全
        'account-security' : {
            url: '/account-security',
            templateUrl: TigerEnv.templatePath + 'account-security.html',
            controller: '',
            cache: false
        },
        //评价列表
        'evaluation-list' : {
            url: '/evaluation-list/:goodsId',
            templateUrl: TigerEnv.templatePath + 'evaluation-list.html',
            controller: 'evaluationListCtrl',
            cache: false
        },
        //评价
        'evaluation' : {
            url: '/evaluation/:orderId',
            templateUrl: TigerEnv.templatePath + 'evaluation.html',
            controller: 'evaluationCtrl',
            cache: false
        },
        //物流详情
        'detail-logistics' : {
            url: '/detail-logistics',
            templateUrl: TigerEnv.templatePath + 'detail-logistics.html',
            controller: '',
            cache: false
        },
        //忘记密码
        'forget-password' : {
            url: '/forget-password',
            templateUrl: TigerEnv.templatePath + 'forget-password.html',
            controller: '',
            cache: false
        },

        //抽奖
        'lottery' : {
            url: '/lottery',
            templateUrl: TigerEnv.templatePath + 'lottery.html',
            controller: 'lotteryCtrl',
            cache: false
        },
        //联系我们
        'contact-us' : {
            url: '/contact-us',
            templateUrl: TigerEnv.templatePath + 'contact-us.html',
            controller: '',
            cache: false
        },

        //往期回顾
        'lottery-review' : {
            url: '/lottery-review',
            templateUrl: TigerEnv.templatePath + 'lottery-review.html',
            controller: 'lotteryReviewCtrl',
            cache: false
        },

    },

    'api' : {
        /* 用户模块 */
        registerPost            : "/api/user/reg",//用户注册
        loginPost               : "/api/user/login", //用户登录
        logoutGet               : "/api/user/logout",//用户登出
        getUserFromSession      : "/api/user/getUserFromSession",  //从session获取用户信息
        getRcodePost            : "/api/user/verify",// http://node.tiger.com:4002/mytest3 http://172.16.110.163:42000/user/verify"
        getUpLevelList          : "/api/user/findLevelByUid", //获取当前等级以及可申请等级，积分
        updateApply             : "/api/user/updateApply" ,   //付款后提交升级申请信息
        getStatusByUid          : "/api/user/getStatusByUid", //根据用户id查找用户申请状态
        getUserInfo             : "/api/user/getUserByUid", //根据用户id查找用户申请状态
        apply                   : "/api/user/apply",   //申请升级
        getUserByParent         : "/api/user/getUserByParent", //根据用户id查找邀请人列表

        diamond                 : "/api/diamond/findByUid",  //查询当前用户的钻石
        findJade                : "/api/jade/findByUid",  //按照用户uid查询翡翠积分
        diamondOperate          : "/api/diamond/operate", //银行卡相关操作
        diamondWithdraw         : "/api/diamond/withdraw", //提现申请

        diamondFindWithdraw     : "/api/diamond/findWithdraw",//钻石积分提现申请列表
        diamondGetDetail        : "/api/diamond/getDetail",  //
        jadeGetDetail           : "/api/jade/getDetail",  //获取翡翠积分管理
        diamondGetPayData       : '/api/diamond/getPayData',//获取支付加密数据
        integrationPay          : '/api/http://gateway.hy.com/integration/pay',//支付
        getPayUrl               : '/api/diamond/getPayUrl',  //获取支付url
        getGiftPayUrl           : '/api/order/gift/pay',   //获取翡翠商品支付url

        addressList             : "/api/address/findByUid", //查询收货地址列表
        setDefaultAddress       : "/api/address/setDefault", //设置默认地址
        findAddressById         : "/api/address/findById",    //根据id查找地址
        addAddress              : "/api/address/add",  //新增地址
        editAddress             : "/api/address/update", //修改地址
        deleteAddress           : "/api/address/delete",//根据id删除地址
        findByPid               : "/api/address/findByPid", //根据上级id查找下级地区信息
        findAllCountry          : "/api/address/findAllCountry", //查找所有的国家

        collectList             : "/api/collection/listpage",  //我的收藏
        collection              : "/api/collection/add", //添加收藏
        collectionDel           : "/api/collection/delete", //取消收藏
        station                 : "/api/station/listpage" ,  //站内信息接口
        stationRead             : "/api/station/read" , //阅读站内信
        stationDel              : "/api/station/delete", //删除站内信



        /* 商品模块 */
        findGoodsPost           : "/api/goods/findGoods", //根据条件搜素商品
        findById                : "/api/goods/findById",  //根据商品ID查询商品信息(商品详情)
        findByShopId            : "/api/goods/findByShopId",  //查询指定商户所有商品分类列表 (店铺商品)
        findStoreInfo           : "/api/shop/findById", //根据商店ID查询商店详细信息（前台）
        goodsByShopId           : "/api/goods/sell",  //取得指定商户的可销售商品列表
        findFirstClass          : "/api/goods/findFirstGoods",  //查询一级商品分类列表
        findSecAndThrClass      : "/api/goods/findSecAndThr",  //根据一级商品分类ID查询二三级商品分类列表
        updateNumber            : "/api/cart/updateNumber", //根据商品id 更新商品数量
        findCartList            : "/api/cart/findCart",  //购物车列表
        cartAdd                 : "/api/cart/add",  //加入购物车
        cartDel                 : "/api/cart/deleteBatch", //批量删除
        findResByColId          : "/api/goods/findResByColId",//商品推广
        findResourceByColId     : "/api/cms/findResourceByColId",   //根据colId查找广告栏信息
        findComment             : "/api/goods/findComment",    //商品评论列表
        goodsComment            : "/api/order/goodsComment",  //商品评论
        fans_select             : "/api/shop/fans_select",  //查询粉丝信息
        fans_count              : "/api/shop/fans_count" ,  //查询粉丝数量信息
        fans_create             : "/api/shop/fans_create",  //关注店铺
        fans_delete             : "/api//shop/fans_delete", //取消关注
        gift_findGoods          : "/api/gift/findGoods", //根据条件搜索商品
        gift_findById           : '/api/gift/findById',  //根据积分商品ID查询商品信息

        /* 订单模块 */
        order                   : "/api/order/create",   //创建订单
        order_gift              : "/api/order/gift/create",//翡翠商品创建订单
        orderByCart             : "/api/order/cartCreate",//从购物车创建订单
        getPayList              : "/api/order/getPayList", //获取支付类型
        orderList               : "/api/order/get",  //根据条件查找订单列表
        order_list_page         : "/api/order/listPage", //

        orderDetail             : "/api/order/findById" , //根据订单id查找订单详情
        order_pay               : "/api/order/gift/pay", //翡翠商品支付

        /* 抽奖模块 */
        findLotteryToday        : "/api//lottery/findLotteryToday", //今日抽奖
        findLotteryYesterday    : "/api//lottery/findLotteryYesterday" , //上期开奖情况
        findHistoryPage         : "/api//lottery/findHistoryPage", //查询开奖历史
        findLotteryByUid        : "/api//lottery/findLotteryByUid",//查询本期个人中奖情况
        findUserHistoryPage     : "/api//lottery/findUserHistoryPage",//查询个人中奖历史
        findAllLottery          : "/api/lottery/findAllLottery", //查询奖池

        addStore                : '/api/shop/add_store',

        /* 商户中心 */
        myProxyGoodsList        : '/api/shop/my/proxy/goods',
        hasShop                 : '/api/shop/hasShop',
        shopInfo                : '/api/shop/shopInfo',
        unBindShop              : '/api/shop/unBindShop',    //解绑
        inviteVerify            : '/api/shop/inviteVerify',  //个人回应邀请
    },

    'controller_path' : '/app/controller/',
    'controller' : [
        'addressCtrl',
        'addressEditCtrl',
        'billCtrl',
        'businessCenterCtrl',
        'cardCtrl',
        'cardEditCtrl',
        'cartCtrl',
        'categoryCtrl',
        'codeCtrl',
        'collectCtrl',
        'depositCtrl',
        'detailCtrl',
        'detailJadeCtrl',
        'diamondBillCtrl',
        'evaluationCtrl',
        'evaluationListCtrl',
        'fakeScoreCtrl',
        'findCtrl',
        'homeCtrl',
        'integralChooseCtrl',
        'integralCtrl',
        'isLoginCtrl',
        'loginCtrl',
        'lotteryCtrl',
        'lotteryReviewCtrl',
        'luishuiCtrl',
        'messageCtrl',
        'messageDetailCtrl',
        'myFakeScoreCtrl',
        'orderCtrl',
        'orderDetailCtrl',
        'payCartCtrl',
        'payCtrl',
        'payJadeCtrl',
        'payShortcutsCtrl',
        'referencesCtrl',
        'registerCtrl',
        'searchCtrl',
        'setAccountCtrl',
        'shopCategoryCtrl',
        'storeCategoryCtrl',
        'storeCtrl',
        'storeRegisterCtrl',
        'upgradeCtrl',
        'userCtrl',
        'withdrawCtrl',

    ],

    'services_path' : '/app/service/',
    'services' : [
        'services',
        'base-service',
        'global-service',
    ]
};
