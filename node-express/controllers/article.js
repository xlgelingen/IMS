const articleModel = require("../models/article");
const Article = new articleModel();
const ClassifyModel = require("../models/classification");
const Classify = new ClassifyModel();
const articleClassifyModel = require("../models/classification_article.js");
const articleClassify = new articleClassifyModel();

const article = {
  index: async function (req, res, next) {
    var articles = await Article.all();
    try {
      res.json({ code: 200, data: { code: 200, articlesInfo: articles } });
    } catch (e) {
      res.json({ code: 0, data: e });
    }
  },

  insert: async function (req, res, next) {
    let name = req.body.name;
    let classifyId = req.body.classify;
    let content = req.body.content;
    // console.log('文章控制：', name, classifyId, content);
    if (!name || !classifyId || !content) {
      res.json({ code: 0, data: "params empty!" });
      return;
    }
    try {
      const classifyArr = await Classify.select({ id: classifyId });
      const classify = classifyArr[0].name;
      // console.log("文章控制classify", classify);
      const article = await Article.insert({ name, classify, content });
      const articleId = article[0];
      await articleClassify.insert({
        article_id: articleId,
        classification_id: classifyId,
      });
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
    let classifyId = req.body.classify;
    let content = req.body.content;
    let id = req.body.id;
    console.log('文章控制/update：', name, classifyId, content, id);
    if (!name || !classifyId || !content || !id) {
      res.json({ code: 0, data: {code: 0, msg:"params empty!"} });
      return;
    }
    try {
      const classifyArr = await Classify.select({ id: classifyId });
      // const classify = classifyArr[0].name;
      const classify = classifyArr[0].name;
      console.log("文章更新classifyArr", classifyArr);
      console.log("文章更新classify", classify);
      console.log("文章更新", name, classify, content);
      await Article.update(id, { name, classify, content });
      await articleClassify.where({ article_id: id }).update({ classification_id: classifyId });
      res.json({
        code: 200,
        data: { code: 200, message: "编辑成功" },
      });
    } catch (e) {
      console.log(e.message);
      res.json({ code: 0, data: e.message || e.errors });
    }
  },

  delete: async function (req, res, next) {
    let id = req.query.id;

    if (!id) {
      res.json({ code: 0, data: "params empty!" });
      return;
    }
    try {
      await Article.delete({ id });
      await articleClassify.delete({ article_id: id });
      res.json({
        code: 200,
        data: { code: 200, message: "删除成功" },
      });
    } catch (e) {
      console.log(e.message);
      res.json({ code: 0, data: e.message || e.errors });
    }
  },
};

module.exports = article;
