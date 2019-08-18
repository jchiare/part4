const _ = require('lodash')

const dummy = blog => {
  return 1
}

const totalLikes = blogs => {
  return blogs.map(blog => blog.likes).reduce((a,c) => a + c)
}

const favoriteBlog = blogs => {
  return _.maxBy(blogs,'likes')
}

const mostBlogs = blogs => {
  return _.maxBy(_.countBy(blogs,'author'))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}