
exports.up = function(knex, Promise) {
  return knex.schema.createTable("post", (table) => {
      table.increments()
      table.text("url")
      table.text("user")
      table.text("category")
      table.integer("likes")
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("post")
};
