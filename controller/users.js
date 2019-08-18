const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request
    if(!body.username || !body.password){
      throw {
        name:'ValidationError',
        message: `${body.username ? 'password' : 'username' } is missing`
      }
    }
    if (body.password.length < 3){
      throw {
        name:'ValidationError',
        message: 'Password must be at least 3 characters long'
      }
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async(request, response, next) => {
  try {
    const returnedUsers = await User.find({})
    response.json(returnedUsers)
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter