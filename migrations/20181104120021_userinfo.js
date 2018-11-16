exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", (table) => {
        table.increments()
        table.text("name")
        table.text("displayName")
        table.text("bio")
        table.text("profilePicture")
        table.timestamp('userSince').defaultTo(knex.fn.now());

    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("users")
  };
  