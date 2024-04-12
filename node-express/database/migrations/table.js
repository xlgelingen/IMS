exports.up = function (knex) {
  return (
    knex.schema
      // 用户
      .createTable("users", function (table) {
        table.increments("id");
        table.string("name", 255);
        table.string("phone", 255);
        table.string("password", 255);
        table.timestamp("create_time").defaultTo(knex.fn.now());
      })
      .createTable("articles", function (table) {
        table.increments("id");
        table.string("name", 255);
        table.string("classify", 255);
        table.text("content");
        table.timestamp("create_time").defaultTo(knex.fn.now());
      })
      .createTable("classifications", function (table) {
        table.increments("id");
        table.string("name", 255);
      })
      .createTable("classification_article", function (table) {
        table.integer("article_id", 11);
        table.integer("classification_id", 11);
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("articles")
    .dropTable("classifications")
    .dropTable("classification_article")
};

exports.config = { transaction: false };
