const mongoose = require('mongoose')
const { MONGODB_URI } = require('.././utils/config')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

module.exports = { Blog }