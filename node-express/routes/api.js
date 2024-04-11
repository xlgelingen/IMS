var express = require('express');
var router = express.Router();

var userController = require('./../controllers/user')
var articleController = require('./../controllers/article')
var classifyController = require('./../controllers/classification')
var loginController = require('./../controllers/login.js');
var tokenController = require('../controllers/token')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/token', tokenController.verify);

router.post('/login/phone', loginController.phoneLogin);
router.post('/login/account', loginController.accountLogin);

router.get('/admin/users/user-info', userController.index);
router.post('/admin/users/create', userController.insert);
router.put('/admin/users/edit', userController.update);
router.delete('/admin/users/del', userController.delete);

router.get('/admin/classify/classify-info', classifyController.index);
router.post('/admin/classify/create', classifyController.insert);
router.put('/admin/classify/edit', classifyController.update);
router.delete('/admin/classify/del', classifyController.delete);

router.get('/admin/articles/article-info', articleController.index);
router.post('/admin/articles/create', articleController.insert);
router.put('/admin/articles/edit', articleController.update);
router.delete('/admin/articles/del', articleController.delete);

module.exports = router;
