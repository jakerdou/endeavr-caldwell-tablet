const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "howdy123",
    database: "Caldwell_WaterCollection_Database",
    host: "localhost",
    port: 5432
});


module.exports = pool;