exports.up = function(knex, Promise) {
    return knex.schema.createTable("memes", (table) => {
        table.increments();
        table.text("url");
        table.text("user");
        table.text("category");
        table.integer("likes");
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("memes")
  };
  