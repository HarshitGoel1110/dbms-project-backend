const express = require("express")
require("./database/name")
const User = require("./models/users")
const userRouter = require("./authenticatingUser")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/users",userRouter)

app.listen(PORT , ()=>{
    console.log("the server is up in running")
})