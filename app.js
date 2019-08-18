const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const blogRouter = require('./controller/blog')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use(requestLogger)

app.use('/api/blogs', blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)


module.exports = app