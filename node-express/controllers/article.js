const moment = require("moment");
const articleModel = require("../models/article");
const Article = new articleModel();
// const userRoleModel = require("../models/user_role.js");
// const userRole = new userRoleModel();

const article = {
  index: async function (req, res, next) {
    var articles = await Article.all();
    try {
      var articlesInfo = articles.map((data) => {
        data.create_time = moment(data.create_time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return data;
      });
      // console.log("articleContrl：", articlesInfo);
      res.json({ code: 200, data: { articlesInfo: articlesInfo } });
    } catch (e) {
      res.locals.error = e;
      res.json({ code: 0, data: e });
    }
  },

  insert: async function (req, res, next) {
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    // let role = req.body.role;
    // console.log(name, phone, password, role);
    if (!name || !phone || !password) {
      res.json({ code: 0, data: "params empty!" });
      return;
    }
    try {
      const article = await Article.insert({ name, phone, password });
      const articleId = article[0];
      // await articleRole.insert({
      //   article_id: articleId,
      //   role_id: role,
      // });
      res.json({
        code: 200,
        data: { code: 200, id: articleId },
        message: "创建成功",
      });
    } catch (e) {
      res.json({ code: 0, data: { code: 0, e } });
    }
  },
  update: async function (req, res, next) {
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    // let roleID = req.body.role;
    let id = req.body.id;
    if (!name || !phone || !password || !id) {
      res.json({ code: 0, data: "params empty!" });
      return;
    }
    try {
      await Article.update(id, { name, phone, password });
      // await articleRole.where({ article_id: id }).update({ role_id: roleID });
      res.json({
        code: 200,
        data: { code: 200, message: "编辑成功"},
      });
    } catch (e) {
      console.log(e.message);
      res.json({ code: 0, data: e.message || e.errors });
    }
  },

  delete: async function (req, res, next) {

  },
};

module.exports = article;
