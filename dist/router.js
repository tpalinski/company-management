"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const employees_1 = require("./routes/employees");
exports.router = (0, express_1.default)();
exports.router.use('/employees', employees_1.employeeRouter);
exports.router.get('/', (req, res, next) => {
    res.status(404).send('Please enter valid API path');
});
