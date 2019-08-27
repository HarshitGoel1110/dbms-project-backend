const jwt = require("jsonwebtoken")
const User = require("../models/users")

const auth = async (request , response , next) =>{
    try{
        const email = request.body.email
        const user = await User.findOne({email})
        if(user.tokens.length!=1)
            return new Error("please login to proceed")
        const token = user.tokens[0].token
        // now we are verifying the token that the user have with him
        const decoded = jwt.verify(token , "secret")
        if(!decoded)
            return new Error("error")
        request.token = token
        request.user = user
        next()
    }
    catch(e){
        response.status(400).send(e)
    }
}

module.exports = auth
