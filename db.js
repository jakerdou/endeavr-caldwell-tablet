const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "howdy123",
    database: "caldwell_water_collection",
    host: "localhost",
    port: 5432
});


module.exports = pool;