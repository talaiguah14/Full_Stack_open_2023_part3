const phonebookRouter = require('express').Router()
const Person = require('../models/personModel')

phonebookRouter.get("/info", async  (request, response) => {
    const countPerson = await  Person.countDocuments({});
    console.log(countPerson)
     const dateNow = new Date();
     response.send(`Total number of persons: ${countPerson}. Current date: ${dateNow}`);
  });

phonebookRouter.get("/", async (request, response) => {
    await Person.find({}).then(result => {
      response.json(result)
    })
  });

phonebookRouter.get("/:id", (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error));
});

phonebookRouter.post("/", (request, response,next) => {
  const body = request.body;

  const person = new Person ({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  person.save().then(savedPerson =>{
    response.status(201).json(savedPerson)
  }).catch(error => next(error));
});

phonebookRouter.put("/:id",(request, response, next)=>{
  const id = request.params.id;
  const body = request.body;

  const opts = {new : true, runValidators: true };

  if (!body) {
    return response.status(400).json({
      error: "Bad request",
    });
  }

  const person = {
    name: body.name,
    phoneNumber: body.phoneNumber,
  };

  Person.findByIdAndUpdate(id, person, opts)
  .then(updatePerson =>{
    response.status(200).json(updatePerson)
  }).catch(error => next(error))
});

phonebookRouter.delete("/:id", async (request, response) => {
  await Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
});



module.exports = phonebookRouter
