import Express, { NextFunction, Request, Response } from "express";
import { getEmployee, getEmployees } from "../db";
import { employeeRouter } from "./employee";

export const employeesRouter = Express();


employeesRouter.get('/', async (req: Request, res: Response) => {
    let employees = await getEmployees();
    if(employees){
        res.send(employees.rows);
    } else {
        res.status(502).send("Error while fetching employees");
    }
})

employeesRouter.use('/:pesel(\\d{11})', async (req: Request, res: Response, next: NextFunction) => {
    let employee = await getEmployee(parseInt(req.params.pesel));
    if (employee) {
        //@ts-expect-error
        req.employee = employee;
        next()
    } else {
        res.status(400).send("No such employee");
    }
})

employeesRouter.get('/:pesel', (req: Request, res: Response) => {
    if("employee" in req) {
        res.send(req.employee);
    } else {
        res.status(400).send("No such employee")
    }
        
})

employeesRouter.use('/:pesel(\\d{11})', employeeRouter)

