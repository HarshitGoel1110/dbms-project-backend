const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const auth = require("./middleware/auth")

const User = require("./models/users")

// for creating up the user
router.post("/signup" , async(request , response) => {
    const user = new User(request.body)
    try{
        await user.save()
        response.status(201).send(user)
    }
    catch(e){
        response.status(400).send(e)
    }
})

router.post("/login" , async(request,response)=>{
    try{
        const user = await User.findByCredentials(request.body.email,request.body.password)
        // now we have check the auth for user and now we want to assign him a new token id
        const token = await user.generateAuthToken()
        response.send({user , token})
    }
    catch(e){
        response.status(400).send(e)
    }
})

router.post("/logout" , auth , async(request , response)=>{
    try{
        request.user.tokens = []
        await request.user.save()
        response.send("successfully logout...")
        console.log("done")
    }
    catch(e){
        response.send("error")
    }
})

router.get("/print" ,auth, (request,response) =>{
    response.send(request.user)
})

module.exports = router
