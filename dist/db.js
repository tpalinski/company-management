"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeProjects = exports.getEmployee = exports.getEmployees = exports.connectToDatabase = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
    keepAlive: true
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    let tries = 5;
    while (tries) {
        try {
            yield pool.connect();
            console.log("Connected successfully");
            break;
        }
        catch (error) {
            console.log(error);
            tries--;
            yield new Promise(res => setTimeout(res, 5000));
        }
    }
});
exports.connectToDatabase = connectToDatabase;
const getEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM Employees";
    try {
        const res = yield pool.query(query);
        return res;
    }
    catch (err) {
        return null;
    }
});
exports.getEmployees = getEmployees;
const getEmployee = (pesel) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "Select Employees.PESEL, Employees.NAME, Employees.SURNAME, Employees.ADRESS, \
                    Employees.EMAIL, Employees.SUPERVISOR, Contracts.NAME as position FROM Employees \
                    LEFT JOIN Contracts ON Contracts.ID = Employees.Position \
                    WHERE Employees.PESEL=$1";
    try {
        const res = yield pool.query(query, [pesel]);
        return res.rows[0];
    }
    catch (err) {
        console.error(err);
        return null;
    }
});
exports.getEmployee = getEmployee;
const getEmployeeProjects = (pesel) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT Projects.NAME, Projects.DESCRIPTION FROM Projects \
    RIGHT JOIN EmployeesProjects ON EmployeesProjects.PROJECT = Projects.ID\
    WHERE EmployeesProjects.EMPLOYEE = $1";
    try {
        const res = yield pool.query(query, [pesel]);
        return res.rows;
    }
    catch (err) {
        console.error(err);
        return null;
    }
});
exports.getEmployeeProjects = getEmployeeProjects;
