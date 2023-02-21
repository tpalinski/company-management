import Express, { Request, Response } from "express";
import { getEmployee, getEmployeeProjects } from "../db";


export const employeeRouter = Express();

employeeRouter.get('/projects', async (req: Request, res: Response) => {
    if(req.employee){
        const projects = await getEmployeeProjects(parseInt(req.employee.pesel));
        if(projects){
            res.send(projects);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(502).send();
    } 
})

employeeRouter.get('/supervisor', async (req: Request, res: Response) => {
    if(req.employee) {
        if(req.employee.supervisor == null) {
            res.status(201).send({});
        } else {
            const supervisor = await getEmployee(parseInt(req.employee.supervisor))
            res.status(200).json(supervisor);
        }
    }
})