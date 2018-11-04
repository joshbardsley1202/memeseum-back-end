// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: "postgres://localhost/memeseum"
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
