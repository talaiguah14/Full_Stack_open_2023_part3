const phonebookRouter = require('express').Router();
const Person = require('../models/personModel');

phonebookRouter.get('/info', async (request, response) => {
  const countPerson = await Person.countDocuments({});
  console.log(countPerson);
  const dateNow = new Date();
  response.send(
    `Total number of persons: ${countPerson}. Current date: ${dateNow}`
  );
});

phonebookRouter.get('/', async (request, response) => {
  const phonebooks = await Person.find({});
  response.json(phonebooks);
});

phonebookRouter.get('/:id', async (request, response, next) => {
  const blog = await Person.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

phonebookRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  const savedPerson = await person.save();
  response.json(savedPerson);
});

phonebookRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const opts = { new: true, runValidators: true };

  if (!body) {
    return response.status(400).json({
      error: 'Bad request',
    });
  }

  const person = {
    name: body.name,
    phoneNumber: body.phoneNumber,
  };

  const updatedPerson = await Person.findByIdAndUpdate(id, person, opts);
  response.status(200).json(updatedPerson);
});

phonebookRouter.delete('/:id', async (request, response) => {
  await Person.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = phonebookRouter;
