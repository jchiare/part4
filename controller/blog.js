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
    if (!blog.url || !blog.title){
      throw {
        name:'ValidationError',
        message: `${blog.url ? 'title' : 'url' } is missing`
      }
    }
    if(!blog['likes']){
      blog['likes'] = 0
    }
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog.toJSON())

  } catch (exception){
    next(exception)
  }
})


blogRouter.put('/:id', async(req,res,next) => {
  try {
    const response = await Blog.findByIdAndUpdate(req.params.id,{ ...req.body }, { new:true })
    res.status(201).json(response.toJSON())
  } catch (exception){
    next(exception)
  }
})

blogRouter.delete('/:id', async(req,res,next) => {

  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()

  } catch (exception){
    next(exception)
  }
})

module.exports = blogRouter