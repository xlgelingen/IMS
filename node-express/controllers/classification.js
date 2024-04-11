const ClassifyModel = require("../models/classification");
const Classify = new ClassifyModel();
const articleClassifyModel = require("../models/classification_article.js");
const articleClassify = new articleClassifyModel();

const user = {
  index: async function (req, res, next) {
    var classifications = await Classify.all();
    try {
      // console.log("userContrl：", usersInfo);
      res.json({ code: 200, data: { code: 200, classificationsInfo: classifications } });
    } catch (e) {
      res.json({ code: 0, data: e });
    }
  },

  insert: async function (req, res, next) {
    let name = req.body.name;
    if (!name) {
      res.json({ code: 0, data: "params empty!" });
      return;
    }
    try {
      const classification = await Classify.insert({ name });
      const classificationId = classification[0];
      res.json({
        code: 200,
        data: { code: 200, id: classificationId },
        message: "创建成功",
      });
    } catch (e) {
      res.json({ code: 0, data: { code: 0, e } });
    }
  },
  update: async function (req, res, next) {
    let id = req.body.id;
    let name = req.body.name;
    // let roleID = req.body.role;
    if (!name || !id) {
      res.json({ code: 0, data: "params empty!" });
      return;
    }
    try {
      await Classify.update(id, { name });
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
    let id = req.query.id;

    if (!id) {
      res.json({ code: 0, data: "params empty!" });
      return;
    }
    try {
      await Classify.delete({ id });
      await articleClassify.delete({ classification_id: id });
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

module.exports = user;
