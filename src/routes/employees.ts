import Express, { NextFunction, Request, Response } from "express";
import { getEmployee, getEmployees } from "../db";
import { validateEmployee } from "../util/validation";
import { employeeRouter } from "./employee";

export const employeesRouter = Express();

const parseEmployeeJSON = (req: Request, res: Response, next: NextFunction) => {
    const employee = validateEmployee(req.body);
    if(employee){
        req.employee = employee
        next()
    } else {
        res.status(400).send()
    }
}

employeesRouter.get('/', async (req: Request, res: Response) => {
    let employees = await getEmployees();
    if(employees){
        res.json(employees.rows);
    } else {
        res.status(502).send("Error while fetching employees");
    }
})

employeesRouter.post('/add',parseEmployeeJSON, async (req: Request, res: Response) => {
    res.status(201).send(req.employee);
})

employeesRouter.put('/update', parseEmployeeJSON ,async (req: Request, res: Response) => {
    res.status(201).send(req.employee);
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
        res.json(req.employee);
    } else {
        res.status(400).send("No such employee")
    }
        
})

employeesRouter.use('/:pesel(\\d{11})', employeeRouter)

