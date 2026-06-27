import { ROLE } from "../../../generated/prisma/enums";


export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    profile_photo?: string;
}


declare global {
    namespace Express {
        interface Request {
            // Add your custom global properties here
            user?: {
                id: string;
                name: string;
                email: string;
                role: ROLE;
            }
        }
    }
}