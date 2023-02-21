import Express, { NextFunction, Request, Response } from "express";
import { employeeRouter } from "./routes/employees";

export let router = Express();

router.use('/employees', employeeRouter);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Please enter valid API path')
})

