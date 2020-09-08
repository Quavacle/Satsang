process.env.NODE_ENV = 'test'

const User = require('../Models/userModel')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

const userOne = {
  username: 'testUser',
  email: 'test@email.com',
  password: '123@abc'
}

const userTwo = {
  username: 'testTwo',
  email: 'fakeTwo@two.com',
  password: 'userTwo123'
}

const bookDetails = {
  title: 'A test booklet',
  subtitle: 'Dont really know',
  authors: ['Hrr Folkien', 'Jrr Tolkien'],
  published: '12/11/1921',
  description: 'Blah blah',
  genres: ['Hullabaloo', 'Pure garbage'],
  cover: 'some url or some"in like that <script>'
}

