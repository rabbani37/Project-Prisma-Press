import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.log("Error : ", err);
    let statusCode;
    let errorMessage = err.message || "Internal Server Error";
    let errorName = err.name || "Internal Server Error";

    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = httpStatus.BAD_REQUEST || 500
        errorMessage = "You've provided incorrect field type or missing fields "
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code = "P2002") {
            statusCode = httpStatus.BAD_REQUEST
            errorMessage = "Dublicate Key Error"
        }
        else if (err.code = "P2003") {
            statusCode = httpStatus.BAD_REQUEST
            errorMessage = "Foreign Key Constrain Failed"
        }
        else if(err.code ="P2025"){
             statusCode = httpStatus.BAD_REQUEST 
        errorMessage = "An operation failed because it depends on one or more records that were required but not found"
        }
    }





    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        name: errorName,
        message: errorMessage,
        error: err.stack,

    })
}