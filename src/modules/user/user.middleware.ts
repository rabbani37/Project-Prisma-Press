import { NextFunction, Request, Response } from "express";
import { ROLE } from "../../../generated/prisma/enums";
import { catchAsync2 } from "../../../utility/trycatchAsync";
import { jwtUtils } from "../../../utility/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status"



export const auth = (...requirdRole: ROLE[]) => {
    return catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.cookies.accessToken ? req.cookies.accessToken :
            req.headers.authorization?.startsWith("Beare ") ?
                req.headers.authorization?.split(" ")[1] : req.headers.authorization;

        if (!token) {
            throw Error("You're not login. Please login to access this resourc");
        }

        const validToken = jwtUtils.tokenVerify(token, config.jwt_access_secret);
        if (validToken.success === false) {
            throw new Error(validToken.error)
        }

        const { id, user: name, email, role } = validToken.data as JwtPayload;

        if (!requirdRole.includes(role)) {
            res.status(403).json({
                success: false,
                statusCode: httpStatus.FORBIDDEN,
                message: "Forbidden, You don't have permission to access this resoruse."
            });
        };

        const user = await prisma.user.findUniqueOrThrow({
            where: { id, email, name, role }
        });

        console.log("user", user);
        if (!user) {
            throw new Error("User Not Found. Please login again ");
        }
        if (user.active_status === "BLOCKED") {
            throw new Error("Your accout is blocked. Please contarct to support. ")
        };

        console.log("object");
        req.user = { id, name, email, role }
        next()
    })
}

