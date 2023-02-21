import {Pool, QueryResult} from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
})


export const connectToDatabase = async () => {
    let tries = 5;
    while(tries){
        try {
            await pool.connect();
            console.log("Connected successfully")
            break;
        } catch (error) {
            console.log(error);
            tries--;
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

export const getEmployees = async (): Promise<QueryResult<any> | null> => {
    const query = "SELECT * FROM Employees";
    try {
        const res = await pool.query(query);
        return res;
    } catch (err) {
        return null;
    }
}

export const getEmployee = async (pesel: number): Promise<QueryResult<any> | null> => {
    const query = "SELECT * FROM Employees WHERE PESEL=$1";
    try {
        const res = await pool.query(query,[pesel])
        return res.rows[0];
    } catch (err) {
        console.error(err);
        return null;
    }
}