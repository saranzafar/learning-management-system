import express, { json, urlencoded } from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// injecting middlewares
app.use(json({ limit: "16kb" }))
app.use(urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

// importing routes
import studentRoutes from "./routes/student.routes.js"

// routes declaration 
app.use("/users", studentRoutes)

// http://localhost:8000/users/register-student

export { app }