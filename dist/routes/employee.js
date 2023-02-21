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
exports.employeeRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
exports.employeeRouter = (0, express_1.default)();
exports.employeeRouter.get('/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.employee) {
        const projects = yield (0, db_1.getEmployeeProjects)(parseInt(req.employee.pesel));
        if (projects) {
            res.send(projects);
        }
        else {
            res.status(404).send();
        }
    }
    else {
        res.status(502).send();
    }
}));
exports.employeeRouter.get('/supervisor');
