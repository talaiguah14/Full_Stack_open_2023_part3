const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const {userExtractor} = require('../utils/middleware')


blogsRouter.get('/', async (request, response,next) => {
  const blogs = await Blog.find({})
  .populate('user',{name : 1,username: 1});
  response.json(blogs);
});

blogsRouter.get('/:id', async (request,response,next)=>{
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', userExtractor , async (request, response,next) => {
  const body = request.body;
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: user.username,
    url: body.url,
    likes: 0,
    user: user._id
  });
 
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog);
 
});

blogsRouter.delete('/:id', userExtractor,async (request, response,next) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if(user.id.toString()=== blog.user.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end();
  }else{
    response.status(401).json({error: 'The user is not authorized to delete this note'});
  }

});

blogsRouter.put('/:id', async (request, response,next)=>{
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
})

module.exports = blogsRouter;
