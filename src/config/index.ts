import dotenv from "dotenv";
import path from 'path';


const rootPath = process.cwd();
dotenv.config({ path: path.join(rootPath, ".env") });

export default {
    port: process.env.PORT || 3000,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    app_url: process.env.APP_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN!,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN!,

}


