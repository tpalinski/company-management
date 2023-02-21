import Express, { Request, Response } from "express";
import { getEmployeeProjects } from "../db";

export const employeeRouter = Express();

employeeRouter.get('/projects', async (req: Request, res: Response) => {
    if("employee" in req){
        //@ts-expect-error
        const projects = await getEmployeeProjects(parseInt(req.employee.pesel));
        if(projects){
            res.send(projects);
        } else {
            res.status(404).send();
        }
    }
    
})