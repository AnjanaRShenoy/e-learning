import express from "express"
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db.js";
import router from "./routes/studentRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
connectDB()
const port= process.env.PORT || 5000
const app= express()
app.use(express.json())

app.use('/api/student', router)
app.use('/api/admin', adminRouter)

app.use(notFound)
app.use(errorHandler)

app.get('/',(req,res)=> res.send("Server is ready"))
app.listen(port,()=>console.log(`server started on port ${port}`))

