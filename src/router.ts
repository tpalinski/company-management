import Express, { NextFunction, Request, Response } from "express";
import { employeesRouter } from "./routes/employees";

export let router = Express();

router.use('/employees', employeesRouter);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Please enter valid API path')
})

