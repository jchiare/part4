const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { Blog } = require('.././models/blog')
const helper = require('.././utils/test_helper')

const initialBlogs = helper.initialBlogs

const singleBlog = helper.singleBlog


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('API tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })

  test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(6)
  })

  test('creates a new blog post', async () => {

    let response = await api.get('/api/blogs')
    expect(response.body.length).toBe(6)

    await api
      .post('/api/blogs')
      .send(singleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    response = await api.get('/api/blogs')
    expect(response.body.length).toBe(7)
  })

  test('missing "like" property validation', async() => {
    const missingLikeProperty = {
      title: 'Random title',
      author: 'No author',
      url: 'http://google.com',
      __v: 0
    }
    const response = await api
      .post('/api/blogs')
      .send(missingLikeProperty)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body['likes']).toBe(0)
  })

  test('missing "url" validation', async() => {
    const missingUrlProperty = {
      title: 'The Simpsons',
      author: 'George',
      likes: 6,
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(missingUrlProperty)
      .expect(400)

  })

  test('missing "title" validation', async() => {
    const missingTitleProperty = {
      author: 'Samantha',
      url: 'http://google.com',
      likes: 3,
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(missingTitleProperty)
      .expect(400)
  })

  test('can delete blog post' ,async() => {
    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .expect(204)
  })

  test('can update the likes of a blog post', async() => {
    const updatedBlog = {
      ...initialBlogs[2],
      likes: initialBlogs[2].likes + 1
    }

    const response = await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9')
      .send(updatedBlog)
      .expect(201)

    expect(response.body.likes).toBe(initialBlogs[2].likes + 1)
  })
})

describe('ID test', () => {
  test('is property id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]['id']).toBeDefined()
  })
})