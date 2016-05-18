/**
 * Created by apps on 15-11-19.
 */
/**
 *  demo
 * @author blank
 * @date   20151118
 * @version 1.0.0
 * @param app
 */

module.exports = function (bfw , router ) {
    router.get('/', function(req, res, next) {
        console.log(req);
        console.log(req.path);
        res.send('aaaaa');
    });

    router.get('/aa/bb/cc', function(req, res, next) {
        console.log(req);
        console.log(req.path);
        console.log(req.baseUrl);
        res.send('bbbb');
    });
};