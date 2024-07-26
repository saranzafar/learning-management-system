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
import adminRoutes from "./routes/admin.routes.js"
import teacherRoutes from "./routes/teacher.routes.js"
import subjectRoutes from "./routes/subject.routes.js"

// routes declaration 
app.use("/admin", adminRoutes)
app.use("/teacher", teacherRoutes)
app.use("/subject", subjectRoutes)

// http://localhost:8000/admin/register-student

export { app }