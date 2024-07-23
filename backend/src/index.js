import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: './env'
})

app.get("/", (req, res) => {
    console.log("Hi");
    return res.status(200)
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on Port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB Connection Fail :: ", err);
    })