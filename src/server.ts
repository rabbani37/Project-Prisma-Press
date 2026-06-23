import app from "./app";
import { prisma } from "./lib/prisma";
import "dotenv/config"
async function main() {

    const PORT = process.env.PORT;


    try {

        // await prisma.$connect();
        console.log(`Connected Database Successfully`);

        app.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`);
        });
    } catch (error) {

        console.log(`Starting the server`, error);
        // await prisma.$disconnect();
        process.exit(1)
    }
};

main()