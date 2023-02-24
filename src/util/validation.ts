import { Employee } from "../types"

export const validateEmployee = (requestBody: Object): Employee | null => {
    if("pesel" in requestBody && "name" in requestBody && "surname" in requestBody
    && "adress" in requestBody  && "email" in requestBody && "supervisor" in requestBody
    && "position" in requestBody) {
        const asEmployee: Employee = {
            pesel: String(requestBody.pesel),
            name: String(requestBody.name),
            surname: String(requestBody.surname),
            adress: String(requestBody.adress),
            email: String(requestBody.email),
            supervisor: String(requestBody.supervisor),
            position: String(requestBody.position)
        } 
        return asEmployee;
    } else {
        return null
    }
}

const checkForSQL = (employee: Object) => {

}