import { Request } from "express";

export {}

export type Employee = {
    pesel: string,
    name: string,
    surname: string,
    adress: string,
    email: string,
    supervisor: string | null,
    position: string
}
declare global{
    namespace Express {
        export interface Request {
            employee?: Employee
        }
    }
}
