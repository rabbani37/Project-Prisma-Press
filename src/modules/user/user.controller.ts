import { Request, Response } from "express";
import httpStatus from "http-status"
import { userService } from "./user.service";







const registerUser = async (req: Request, res: Response) => {

    try {
        const payload = req.body;

        const user = await userService.registerUserIntoDB(payload)

        res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User Register Successfully",
            data: { user }
        })
    }
    catch (error: any) {

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "User Register Faild",
            error: error.message
        })

    }
};




export const userController = {
    registerUser
}