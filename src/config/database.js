const { Client } = require("pg");
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'hotel',
  password: '123',
  port: 5432,
});

client.connect();
client.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
})

module.exports = client;
