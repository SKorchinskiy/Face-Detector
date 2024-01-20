const config = (() => ({
  client: process.env.KNEX_CLIENT,
  connection: {
    host: process.env.KNEX_CONNECTION_HOST,
    port: process.env.KNEX_CONNECTION_PORT,
    user: process.env.KNEX_CONNECTION_USER,
    password: process.env.KNEX_CONNECTION_PASSWORD,
    database: process.env.KNEX_CONNECTION_DATABASE,
  },
}))();

module.exports = require("knex")(config);
