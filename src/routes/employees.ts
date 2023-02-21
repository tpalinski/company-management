import Express, { Request, Response } from "express";
import { getEmployees } from "../db";

export const employeeRouter = Express();

employeeRouter.get('/', async (req: Request, res: Response) => {
    let employees = await getEmployees();
    if(employees){
        res.send(employees.rows);
    } else {
        res.status(502).send("Error while fetching employees");
    }
})