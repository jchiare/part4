const blogRouter = require('express').Router()
const { Blog } = require('.././models/blog')

blogRouter.get('/', async(req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)

  } catch(exception) {
    next(exception)
  }
})

blogRouter.post('/', async(req, res, next) => {
  try {
    const blog = await new Blog(req.body)
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)

  } catch (exception){
    next(exception)
  }
})

module.exports = blogRouter