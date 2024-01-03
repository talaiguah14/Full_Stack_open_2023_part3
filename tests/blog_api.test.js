const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blogModel');
const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for(let blog of initialBlogs){
    let noteObject = new Blog(blog)
    await noteObject.save()
  }
});

describe('all blogs are returned', () => {
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);
    expect(titles).toContain('React patterns');
  });
});

describe('unique identifier of blog posts is called id', () => {
  test('unique identifier name id', async () => {
    const response = await api.get('/api/blogs');

    const id = response.body.map((r) => r.id);
    expect(id).toBeDefined();
  });
});

describe('a valid note can be added', ()=> {
  test('a valid note can be added',async ()=>{
    const newBlog = {
      title: 'Un día cualquiera',
      author: 'Anonimo',
      url: 'www.undíacualquiera.com',
      likes: 12
    }

    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Un día cualquiera')
  })
})

afterAll(() => {
  mongoose.connection.close();
});
