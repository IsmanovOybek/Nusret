import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

mongoose
    .connect(process.env.MONGO_URL as string, {})
    .then((data) => {
        console.log("MongoDB connection succed");
        const PORT = process.env.PORT ?? 3004;
        app.listen(PORT, function () {
            console.info(`The server is running successfully on port: ${PORT}`);
            console.info(`Admin project on http://localhost:${PORT}/ \n`);

        });
    })
    .catch((err) => {
        console.log("ERROR on connection MongoDB", err);

    }) 