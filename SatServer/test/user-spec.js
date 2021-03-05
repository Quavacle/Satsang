process.env.NODE_ENV = 'test'

const User = require('../Models/userModel')
const Book = require('../Models/bookModel')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const expect = chai.expect
chai.use(chaiHttp)


let tokenOne = null;
let tokenTwo = null;
let idOne = null;
let idTwo = null;
let instance = null;

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

const userThree = {
  username: 'testThree',
  email: 'fakeThree@three.com',
  password: 'a1!A'
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

// User Creation/Log In
describe('Create, Login, Check Token', () => {
  before((done) => {
    User.remove({
      $or: [{ email: userOne.email }, { email: userTwo.email }, { email: userThree.email }]
    }, (err, res) => {
      if (err) { return err }
      return res
    })
    Book.findOneAndDelete({ _id: -1 }, (err, res) => {
      if (err) { return err }
      return res
    })
    done()
  })
  after((done) => {
    User.remove({
      $or: [{ email: userOne.email }, { email: userTwo.email }, { email: userThree.email }]
    }, (err, res) => {
      if (err) { return err }
      return res
    })
    Book.findOneAndDelete({ _id: -1 }, (err, res) => {
      if (err) { return err }
      return res
    })
    done()
  })

  it('Should register userOne', (done) => {
    chai
      .request(server)
      .post('/register')
      .send(userOne)
      .end((err, res) => {
        if (err) {
          return err
        }
        res.should.have.status(201)
        idOne = res.body.id
        expect(res.body.auth).to.be.true
        done()
      })
  })

  it('Should register userTwo', (done) => {
    chai
      .request(server)
      .post('/register')
      .send(userTwo)
      .end((err, res) => {
        if (err) {
          return err
        }
        res.should.have.status(201)
        tokenTwo = res.body.token
        idTwo = res.body.id
        expect(res.body.auth).to.be.true
        done()
      })
  })

  it('should log user in', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(userOne)
      .end((err, res) => {
        if (err) {
          return err
        }
        res.should.have.status(200)
        expect(res.body.auth).to.be.true
        tokenOne = res.body.token;
        res.body.should.have.property('token')
        done()
      })
  })

  it('should access logged in users dash', (done) => {
    chai
      .request(server)
      .get('/dashboard')
      .set('authorization', tokenOne)
      .end((err, res) => {
        if (err) {
          return err
        }
        res.should.have.status(200)
        done()
      })
  })

  // Book Creation
  it('userOne creates book', (done) => {
    chai
      .request(server)
      .post('/instances/create')
      .set('authorization', tokenOne)
      .send(bookDetails)
      .end((err, res) => {
        if (err) {
          return err
        }
        res.should.have.status(201)
        instance = res.body._id
        done()
      })
  })

  // Borrow Request, Accept Request

  it('userTwo requests userOne book', (done) => {
    chai
      .request(server)
      .put('/instances/' + instance + '/request')
      .set('authorization', tokenTwo)
      .end((err, res) => {
        if (err) {
          return err
        }
        // userTwo should be in the requested_by array
        expect(res.body.requested_by[0]).to.equal(idTwo)
        res.should.have.status(200)
        done()
      })
  })

  it('userOne accepts request from userTwo', (done) => {
    chai
      .request(server)
      .put('/instances/' + instance + '/accept')
      .set('authorization', tokenOne)
      .send({
        acceptedUser: idTwo
      })
      .end((err, res) => {
        if (err) {
          return err
        }
        // Requested by array should be empty
        expect(res.body.requested_by.length).to.equal(0)
        // Borrowed by should be userTwo
        expect(res.body.borrowed_by).to.equal(idTwo)
        res.should.have.status(200)
        done()
      })
  })

  it('userTwo begins return to userOne', (done) => {
    chai
      .request(server)
      .put('/instances/' + instance + '/return')
      .set('authorization', tokenTwo)
      .end((err, res) => {
        if (err) {
          return err
        }
        // Pending return boolean indicates userTwo has returned the book
        expect(res.body.pending_return).to.equal(true)
        res.should.have.status(200)
        done()
      })
  })

  it('userOne accepts return from userTwo', (done) => {
    chai
      .request(server)
      .put('/instances/' + instance + '/accept_return')
      .set('authorization', tokenOne)
      .end((err, res) => {
        if (err) {
          return err
        }
        // Should no longer be pending return
        expect(res.body.pending_return).to.equal(false)
        // Borrowed by field should be empty
        expect(res.body.borrowed_by).to.equal(null)
        res.should.have.status(200)
        done()
      })
  })

  it('userOne updates and transfers ownership to userTwo', (done) => {
    chai
      .request(server)
      .put('/instances/' + instance + '/update')
      .set('authorization', tokenOne)
      .send({
        condition: 'UPDATED BOOK',
        notes: 'A wondrous read, BEAUTY INCARNATE',
        user: [idTwo]
      })
      .end((err, res) => {
        if (err) {
          return err
        }
        res.should.have.status(200)
        expect(res.body.user).to.equal(idTwo)
        expect(res.body.condition).to.equal('UPDATED BOOK')
        done()
      })
  })

  it('userOne attempts to update userTwos book and fails', (done) => {
    chai
      .request(server)
      .put('/instances/' + instance + '/update')
      .set('authorization', tokenOne)
      .send({
        condition: 'MY BOOK NOW',
        user: [idOne]
      })
      .end((err, res) => {
        if (err) {
          return err
        }
        res.should.have.status(401)
        done()
      })
  })

  it('should show detail page of book', (done) => {
    console.log(instance)
    chai
      .request(server)
      .get('/instances/' + instance)
      .set('authorization', tokenTwo)
      .end((err, res) => {
        if (err) {
          return err
        }
        console.log(res.body)
        res.should.have.status(200)
        done()
      })
  })

  it('get book index page', function (done) {
    chai
      .request(server)
      .get('/books/index')
      .end((err, res) => {
        if (err) { return err }
        console.log(res.body)
        res.should.have.status(200)
        done()
      })
  })

  // PUBLIC instances
  it('get ALL instances', function (done) {
    chai
      .request(server)
      .get('/instances/index')
      .end((err, res) => {
        if (err) { return err }
        res.should.have.status(200)
        done()
      })
  })

  it('get instance PUBLIC detail page', (done) => {
    chai
      .request(server)
      .get('/instances/' + instance)
      .end((err, res) => {
        if (err) return err
        res.should.have.status(200)
        done()
      })
  })
  // OWNER instances
  it('get all OWNED instances', function (done) {
    chai
      .request(server)
      .get('/instances/owned')
      .set('authorization', tokenTwo)
      .end((err, res) => {
        if (err) { return err }
        res.should.have.status(200)
        expect(res.body.length).to.equal(1)
        expect(res.body[0].user._id).to.equal(idTwo)
        done()
      })
  })
  it('get instance OWNER detail page', (done) => {
    chai
      .request(server)
      .get('/instances/' + instance + '/detail')
      .set('authorization', tokenTwo)
      .end((err, res) => {
        if (err) return err
        res.should.have.status(200)
        done()
      })
  })
})
