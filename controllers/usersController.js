const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

 validarUsers = (body,response) =>{

   
 }

userRouter.get('/',async (request, response)=>{
    const users = await User.find({}).populate('notes',{ content: 1, date: 1 })
    response.json(users)
});

userRouter.post('/',async (request, response)=>{
    const body = request.body

    if(body.username.length < 3){
        response.status(400)
        .json('the username must be at least 3 characters long.')
    }
    if (body.password.length< 3){ 
        response.status(400)
        .json('the password must be at least 3 characters long.')
    }

    const saltRounds = 10


    const passwordHash = await bcrypt.hash(body.password,saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    });

    const savedUser = await user.save()

    response.status(201).json(savedUser);
});

module.exports = userRouter