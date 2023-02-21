import Express, { NextFunction, Request, Response } from "express";

export let router = Express();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Please enter valid API path')
})

