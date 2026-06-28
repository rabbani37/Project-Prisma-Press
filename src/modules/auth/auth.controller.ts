import { NextFunction, Request, Response } from "express";
import { catchAsync2 } from "../../../utility/trycatchAsync";
import { authService } from "./auth.service";
import { sendRespose } from "../../../utility/sendResponce";
import httpStatus from "http-status"


const loginUser = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24  // 1d
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7d
    })

    sendRespose(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Login Sccessfully",
        data: { accessToken, refreshToken }
    });
});


const refreshToken = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken } = await authService.refreshToken(refreshToken);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });
    
    sendRespose(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token Refresh Successfully ",
        data: { accessToken }
    })
});



export const authController = {
    loginUser,
    refreshToken
};