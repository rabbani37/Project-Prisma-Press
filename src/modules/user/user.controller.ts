import { NextFunction, Request, response, Response } from "express";
import httpStatus from "http-status"
import { userService } from "./user.service";
import { catchAsync2 } from "../../../utility/trycatchAsync";
import { sendRespose } from "../../../utility/sendResponce";





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


const getMyProfile = catchAsync2(async (req: Request, res: Response,) => {
    const profile = await userService.getMyProfileFromDB(req.user?.id as string)

    sendRespose(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Successfully get your profile",
        data: profile
    })
});


const updateMyProfile = catchAsync2(async (req: Request, res: Response,) => {

    const userid = req.user?.id as string;
    const payload = req.body;

    const profile = await userService.updateMyProfileFromDB(userid, payload);

    sendRespose(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Successfully Updated your profile",
        data: profile
    })
});


export const userController = {
    registerUser,
    getMyProfile,
    updateMyProfile
}