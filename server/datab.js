const Pool=require("pg").Pool;
const pool=new Pool({
    user: "postgres",
    password : "Lakshita@123",
    host: "localhost",
    port: 5432,
    database: "dbpern",
})


module.exports=pool;
