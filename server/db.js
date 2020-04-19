const Pool = require("pg").Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
});

module.exports  = pool;