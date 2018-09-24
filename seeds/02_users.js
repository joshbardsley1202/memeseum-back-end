const users = require("../user")

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert(users);
    }).then(() => {
      return knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 2;")
    });
};
