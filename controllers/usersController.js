const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

 validarUsers = (request) =>{
    if(!request.User){
        return 
    }
 }

userRouter.get('/',async (request, response)=>{
    const users = await User.find({}).populate('notes',{ content: 1, date: 1 })
    response.json(users)
});

userRouter.post('/',async (request, response)=>{
    const body = request.body

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