const posts = require("../post")

exports.seed = function(knex, Promise) {
  return knex('post').del()
    .then(function () {
      return knex('post').insert(posts)
    }).then(() => {
      return knex.raw("ALTER SEQUENCE post_id_seq RESTART WITH 4;")
    })
};
