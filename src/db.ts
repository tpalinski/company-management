import {Pool, QueryResult} from "pg";
import dotenv from "dotenv";
import { Employee } from "./types";

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
    keepAlive: true
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
    const query = "Select Employees.PESEL, Employees.NAME, Employees.SURNAME, Employees.ADRESS, \
                    Employees.EMAIL, Employees.SUPERVISOR, Contracts.NAME as position FROM Employees \
                    LEFT JOIN Contracts ON Contracts.ID = Employees.Position \
                    WHERE Employees.PESEL=$1";
    try {
        const res = await pool.query(query,[pesel])
        return res.rows[0];
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const getEmployeeProjects = async (pesel: number): Promise<any[]| null> => {
    const query = "SELECT Projects.NAME, Projects.DESCRIPTION FROM Projects \
    RIGHT JOIN EmployeesProjects ON EmployeesProjects.PROJECT = Projects.ID\
    WHERE EmployeesProjects.EMPLOYEE = $1"
    try {
        const res = await pool.query(query, [pesel])
        return res.rows;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const checkEmployee = async (pesel: number) => {
    const res = await getEmployee(pesel)
    if(res && "pesel" in res){
        return true;
    }
    return false;
}

export const insertEmployee = async (employee: Employee): Promise<Employee | null> => {
    const query = "INSERT INTO Employees(PESEL, Name, Surname, Adress, Email, Supervisor, Position) \
    VALUES($1, $2, $3, $4, $5, $6, $7)"
    if(!employee.supervisor) employee.supervisor = "null";
    const employeeParams: String[] = [employee.pesel, employee.name, employee.surname, 
                                      employee.adress, employee.supervisor, employee.email];
    try {
        const res = await pool.query(query, employeeParams);
        return employee;
    } catch (err) {
        console.error(err);
        return null;
    }
}