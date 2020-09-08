process.env.NODE_ENV = 'test'

const User = require('../Models/userModel')
const Book = require('../Models/bookModel')
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

let tokenOne = null;
let tokenTwo = null;
let idOne = null;
let idTwo = null;
let instance = null;

// User Creation/Log In
describe('Create, Login, Check Token', () => {
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
  // after((done) => {
  //   User.remove({
  //     $or: [{ email: userOne.email }, { email: userTwo.email }, { email: userThree.email }]
  //   }, (err, res) => {
  //     if (err) { return err }
  //     return res
  //   })
  //   done()
  // })

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
  it('Uses userOne to create book', (done) => {
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
        res.should.have.status(200)
        done()
      })
  })

  it('userOne accepts request from userTwo', (done) => {
    console.log('--------------INSIDE TEST REQUEST: ID ONE------------------')
    console.log(idOne)
    console.log('--------------INSIDE TEST REQUEST: INSTANCE ID------------------')
    console.log(instance)
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
        console.log(res.body)
        console.log(idTwo)
        res.should.have.status(200)
        done()
      })
  })
})

// describe('Login non-owner -> Attempt to accept -> Fail', () => {
//   it('Fail to accept request (invalid user)', (done) => {
//     chai
//       .request(server)
//       .post('/login')
//       .send(userThree)
//       .end((err, res) => {
//         if (err) {
//           console.log(err);
//         }
//         res.should.have.status(200);
//         const token = res.body.token;
//         chai
//           .request(server)
//           .put('/instances/' + instance + '/accept')
//           .set('authorization', token)
//           .send({ acceptedUser: userTwo._id })
//           .end((err, res) => {
//             if (err) {
//               console.log(err);
//             }
//             res.should.have.status(401);
//             done();
//           });
//       });
//   });
// });

// describe('Login (user 3) -> Accept request to borrow book', () => {
//   it('Accept request', (done) => {
//     chai
//       .request(server)
//       .post('/login')
//       .send(userTwo)
//       .end((err, res) => {
//         if (err) {
//           console.log(err);
//         }
//         res.should.have.status(200);
//         const token = res.body.token;
//         chai
//           .request(server)
//           .put('/instances/' + instance + '/accept')
//           .set('authorization', token)
//           .send({ acceptedUser: userThree._id })
//           .end((err, res) => {
//             if (err) {
//               console.log(err);
//             }
//             res.should.have.status(200);
//             done();
//           });
//       });
//   });
// });


