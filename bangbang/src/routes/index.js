/**
 * 主路由
 * @author blank
 * @date   20151118
 * @version 1.0.0
 * @param app
 */

module.exports = function (bfw , router ) {


	/**
	 * api路由
	 */
	router.all('/api/:act/:op?', function(req, res, next) {
		//if(!req.session.isLogin){
		//    res.redirect(BFunc.getUrl('/login'));
		//    return ;
		//}

		BLog.debug( 'api deal... ' + req.params.act + ' ' +  req.params.op );
		req.params.op = req.params.op || 'index';

		BFunc.controller(bfw , req , res, next);
		//next();
	});

	/**
	 * 所有地址路由
	 */
	router.all('/*', function(req, res, next){
		//微信端要注释这个跨域
		/*	res.header("Access-Control-Allow-Credentials", "true");
		 res.header("Access-Control-Allow-Origin", "http://172.16.110.150:8100");
		 res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,X-CSRFToken");
		 res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		 res.header("X-Powered-By",' 3.2.1');
		 res.header("Content-Type", "application/json;charset=utf-8");*/

		if(/\.+/.test(req.path)){		//如果path有'.'字符的忽略 【test】
			next();
			return ;
		}

		res.render("app/index");
	});



};
