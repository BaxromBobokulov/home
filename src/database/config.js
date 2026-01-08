import { Pool } from "pg";
import { config } from "dotenv";

config()

const pool = new Pool({
    user:process.env.DB_USER,
    database:process.env.DB_DATABASE,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
})

export default pool