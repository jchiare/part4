const blogRouter = require('express').Router()
const { Blog } = require('.././models/blog')
const User = require('.././models/users')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async(req, res, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user',{ username: 1, name: 1 })
    res.json(blogs)

  } catch(exception) {
    next(exception)
  }
})

blogRouter.post('/', async(req, res, next) => {
  const { body, token } = req
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await new Blog({ ...body, user: user._id })
    if (!blog.url || !blog.title){
      throw {
        name:'ValidationError',
        message: `${blog.url ? 'title' : 'url' } is missing`
      }
    }
    if(!blog['likes']){
      blog['likes'] = 0
    }
    blog['comments'] = []
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog.toJSON())

  } catch (exception){
    next(exception)
  }
})

blogRouter.get('/:id', async(req,res,next) => {
  try {
    //const response = await Blog.findByIdAndUpdate(req.params.id,{ ...req.body }, { new:true })
    res.status(201).send('hi')
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

blogRouter.post('/:id/comments', async(req,res,next) => {
  try {
    const response = await Blog.findByIdAndUpdate(req.params.id,{ $push: { comments:req.body.comment } }, { new:true })
    res.status(201).json(response.toJSON())
  } catch (exception){
    next(exception)
  }
})

blogRouter.delete('/:id', async(req,res,next) => {
  const { token, params } = req

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(params.id)

    if (blog.user.toString() === user.id.toString()){
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    }
    else {
      throw {
        name: 'PermissionError'
      }
    }


  } catch (exception){
    next(exception)
  }
})

module.exports = blogRouter