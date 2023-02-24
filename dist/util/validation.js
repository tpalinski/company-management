"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployee = void 0;
const validateEmployee = (requestBody) => {
    if ("pesel" in requestBody && "name" in requestBody && "surname" in requestBody
        && "adress" in requestBody && "email" in requestBody && "supervisor" in requestBody
        && "position" in requestBody) {
        const asEmployee = {
            pesel: String(requestBody.pesel),
            name: String(requestBody.name),
            surname: String(requestBody.surname),
            adress: String(requestBody.adress),
            email: String(requestBody.email),
            supervisor: String(requestBody.supervisor),
            position: String(requestBody.position)
        };
        return asEmployee;
    }
    else {
        return null;
    }
};
exports.validateEmployee = validateEmployee;
const checkForSQL = (employee) => {
};
