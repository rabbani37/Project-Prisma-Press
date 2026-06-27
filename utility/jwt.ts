import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (payload: JwtPayload, secret: string, expires: SignOptions) => {
    const token = jwt.sign(payload, secret, { expiresIn: expires } as SignOptions);
    return token
};


const tokenVerify = (token: string, secret: string) => {
    try {
        const verified = jwt.verify(token, secret)
        return {
            success: true,
            data: verified
        };
    } catch (error:any) {
        return {
            success:false,
            error:error.message 
        }
    }
}

export const jwtUtils = {
    createToken,
    tokenVerify
}