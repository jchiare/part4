const User = require('.././models/users')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('.././utils/test_helper')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'root' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jayc',
      name: 'Jay c',
      password: '12345678',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('returns users', async() => {

    const res = await api
      .get('/api/users')
      .expect(200)

    expect(res.body.length).toBe(1)

  })

  test('creation fails with non-unique username', async () => {

    const newUser = {
      username: 'root',
      name: 'Jay c',
      password: 'root',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toEqual({
      error: 'User validation failed: username: Error, ' +
        'expected `username` to be unique. Value: ' +
        '`root`'
    })

  })
})

/*
title
:
"Canonical string reduction"
author
:
"Edsger W. Dijkstra"
url
:
"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
likes
:
12



title
:
"Lord of the rings"
author
:
"J K Tolken"
url
:
"http://lotr.com"
likes
:
1*/