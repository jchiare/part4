const listHelper = require('../utils/list_helper')
const helper = require('.././utils/test_helper')

describe('dummy test', () => {
  const blogs = []

  test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

})

describe('total likes', () => {

  test('when totalLikes function returns the true total likes of all blogs', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })

})

describe('favourite blog', () => {

  test('when favoriteBlog function returns the blog with highest likes', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs)
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })
})


describe('most blogs', () => {

  test('when mostBlogs function returns author with most blogs', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})


describe('most likes', () => {

  test('user has most likes',() => {
    const result = listHelper.mostLikes(helper.initialBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})