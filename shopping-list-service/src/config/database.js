
const {Pool} = require('pg');
const config=require('./env');

const pool = new Pool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  user: config.DB_USER,       
  password: config.DB_PASSWORD,
});

pool.on('error',(err)=>{
  console.error('Unexpexted error on idle client',err);
});

module.exports = pool;

