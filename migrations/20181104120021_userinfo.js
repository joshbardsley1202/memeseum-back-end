exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", (table) => {
        table.increments()
        table.text("firstName")
        table.text("lastName")
        table.text("displayName")
        table.text("bio")
        table.text("profilePicture")
        table.boolean("saved_posts")
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("users")
  };
  