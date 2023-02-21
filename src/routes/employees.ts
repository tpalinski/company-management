import Express, { NextFunction, Request, Response } from "express";
import { getEmployee, getEmployees } from "../db";

export const employeeRouter = Express();


employeeRouter.get('/', async (req: Request, res: Response) => {
    let employees = await getEmployees();
    if(employees){
        res.send(employees.rows);
    } else {
        res.status(502).send("Error while fetching employees");
    }
})

employeeRouter.use('/:pesel(\\d{11})', async (req: Request, res: Response, next: NextFunction) => {
    let employee = await getEmployee(parseInt(req.params.pesel));
    if (employee) {
        //@ts-expect-error
        req.employee = employee;
        console.log(employee);
        next()
    } else {
        res.status(400).send();
    }
})

employeeRouter.get('/:pesel', (req: Request, res: Response) => {
    //@ts-expect-error
    res.send(req.employee);
})