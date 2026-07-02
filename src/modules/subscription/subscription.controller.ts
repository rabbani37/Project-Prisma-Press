import { NextFunction, Request, Response } from "express"
import { catchAsync2 } from "../../../utility/trycatchAsync"
import { subscriptionService } from "./subscription.service"
import { sendRespose } from "../../../utility/sendResponce"
import status from "http-status"



const createCheckoutSession = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.user?.id
    const result = await subscriptionService.createCheckoutSession(userId as string)

    sendRespose(res, {
        success: true,
        statusCode: status.OK,
        message: "Successfully Chackout",
        data: result
    })
}
)


export const subscriptionController = {
    createCheckoutSession
}