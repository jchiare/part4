const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')

const blogRouter = require('./controller/blog')
const usersRouter = require('./controller/users')

const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')

logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
mongoose.set('useFindAndModify', false)

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use(requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)


module.exports = app