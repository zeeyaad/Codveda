const { Client } = require("pg");

const connection = new Client({
  host: "localhost",
  port: 5432,
  user:"postgres",
  password: "0000",
  database: "Club_Sys"
});

connection.connect()
  .then(()=>console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err.stack));

module.exports = connection;