"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const router_1 = require("./router");
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.connectToDatabase)();
// middleware setup
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
const PORT = process.env.PORT || 3001;
app.use('/api', router_1.router);
app.get('/', (req, res, next) => {
    res.status(200).send("Hello");
});
app.listen(PORT, () => {
    console.log(`Server is runinng on port ${PORT}`);
});
