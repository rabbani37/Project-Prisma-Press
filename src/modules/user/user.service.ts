import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcrypt"
import { IRegisterUser } from "./user.interface";



const registerUserIntoDB = async (payload: IRegisterUser) => {
    const { name, email, password, profile_photo } = payload


    const isExsistUser = await prisma.user.findUnique({
        where: { email }
    });
    if (isExsistUser) {
        throw Error("User with this email already exgist")
    }

    const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    });
    await prisma.profile.create({
        data: {
            user_id: createUser.id,
            profile_photo
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: createUser.id,
            email: createUser.email || email
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    });

    return user;
};



export const userService = {
    registerUserIntoDB
}