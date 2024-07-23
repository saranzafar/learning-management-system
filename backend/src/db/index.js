import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB Connected!! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("Error While connecting to DB: ", error);
        process.exit(1)
    }
}

export default connectDB