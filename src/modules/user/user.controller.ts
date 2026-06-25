import { NextFunction, Request, response, Response } from "express";
import httpStatus from "http-status"
import { userService } from "./user.service";
import { catchAsync, catchAsync2 } from "../../../utility/trycatchAsync";
import { sendRespose } from "../../../utility/sendResponce";



// const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     const payload = req.body;
//     const user = await userService.registerUserIntoDB(payload);

//     res.status(httpStatus.CREATED).json({
//         success: true,
//         statusCode: httpStatus.CREATED,
//         message: "User Register Successfully",
//         data: { user }
//     });


// });


const registerUser = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);
    sendRespose(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User register successfully",
        data: { user }
    });
});



export const userController = {
    registerUser
}