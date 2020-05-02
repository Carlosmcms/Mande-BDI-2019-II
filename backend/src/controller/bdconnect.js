const { Pool, Client } = require('pg'); // libreria de posgrest
const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: 5432,
};


const pool = new Pool({ config });
const client = new Client({ config });

module.exports = {
  pool,
  client
}

