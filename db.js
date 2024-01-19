const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud_powering',
  password: '0000',
  port: 5433,
});

module.exports = pool;