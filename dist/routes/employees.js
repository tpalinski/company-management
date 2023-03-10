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
exports.employeesRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const employee_1 = require("./employee");
exports.employeesRouter = (0, express_1.default)();
exports.employeesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let employees = yield (0, db_1.getEmployees)();
    if (employees) {
        res.json(employees.rows);
    }
    else {
        res.status(502).send("Error while fetching employees");
    }
}));
exports.employeesRouter.use('/:pesel(\\d{11})', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let employee = yield (0, db_1.getEmployee)(parseInt(req.params.pesel));
    if (employee) {
        //@ts-expect-error
        req.employee = employee;
        next();
    }
    else {
        res.status(400).send("No such employee");
    }
}));
exports.employeesRouter.get('/:pesel', (req, res) => {
    if ("employee" in req) {
        res.json(req.employee);
    }
    else {
        res.status(400).send("No such employee");
    }
});
exports.employeesRouter.use('/:pesel(\\d{11})', employee_1.employeeRouter);
