const express = require('express')
const cors =require("cors")
const patientsRouter =require('./routers/PatientRouter.js')

const app =express()
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use('/patients', patientsRouter)

const PORT =process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))