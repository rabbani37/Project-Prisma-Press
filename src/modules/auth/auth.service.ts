import { urlencoded } from "express";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../../utility/jwt";


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

};






export const authService = {
    loginUser
}