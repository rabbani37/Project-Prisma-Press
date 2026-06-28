import { urlencoded } from "express";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../../utility/jwt";
import { emitWarning } from "node:process";


const loginUser = async (payload: ILoginUser) => {

    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    });

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
        throw Error("Invalid Credentials ");
    };


    const jwtPayload = {
        id: user.id,
        user: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions);


    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in as SignOptions);

    return { accessToken, refreshToken };

};;


const refreshToken = async (refreshToken: string) => {

    const verifiedRefreshToken = jwtUtils.tokenVerify(refreshToken, config.jwt_refresh_secret);
    if (!verifiedRefreshToken.success) {
        throw new Error(verifiedRefreshToken.error)
    };


    const { id } = verifiedRefreshToken.data as JwtPayload;
    const user = await prisma.user.findFirstOrThrow({
        where: { id }
    });


    if (user.active_status === "BLOCKED") {
        throw new Error("User is Blocked!")
    };
    

    const payload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    const accessToken = jwtUtils.createToken(payload, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions);

    return {accessToken}
}






export const authService = {
    loginUser,
    refreshToken
}