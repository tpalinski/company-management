"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const router_1 = require("./router");
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.connectToDatabase)();
const PORT = process.env.PORT || 3001;
app.use('/api', router_1.router);
app.get('/', (req, res, next) => {
    res.status(200).send("Hello");
});
app.listen(PORT, () => {
    console.log(`Server is runinng on port ${PORT}`);
});
