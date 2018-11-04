exports.up = function(knex, Promise) {
    return knex.schema.createTable("users",(table) => {
        table.increments()
        table.text("first_name")
        table.text("last_name")
        table.text("username")
        table.boolean("saved_posts")
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("users")
  };
  