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

const mostBlogs = allBlogs => {
  return _.maxBy(_.map(_.countBy(allBlogs,'author'), (val, key) => ({ author:key,blogs:val })),'blogs')
}

const mostLikes = allBlogs => {
  const bloggers = {}
  for (let blog in allBlogs){
    if(!bloggers[allBlogs[blog]['author']]){
      bloggers[allBlogs[blog]['author']] = allBlogs[blog]['likes']
    } else {
      bloggers[allBlogs[blog]['author']] = bloggers[allBlogs[blog]['author']] + allBlogs[blog]['likes']
    }
  }
  return _.maxBy(_.map(bloggers, (val,key) => ({ author:key,likes:val })),'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}