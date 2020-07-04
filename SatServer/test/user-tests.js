process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../Models/userModel');
let Book = require('../Models/bookModel');
let Instance = require('../Models/instanceModel');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

const user_one_login = {
  username: 'testUser',
  email: 'test@email.com',
  password: '123@abc',
};

const user_one_register = {
  username: 'testUser',
  email: 'test@email.com',

  password: '123@abc',
};

const kokomo = {
  _id: '5efa4e8ec85e352cb8492a51',
  username: 'bananas',
  email: 'kokomo@kokomo.com',
  password: 'kokomo123',
};

const foibles = {
  _id: '5efa4e7bc85e352cb8492a50',
  username: 'robbits',
  email: 'foibles@fribble.com',
  password: 'a1!A',
};

const book_details = {
  title: 'A test booklet',
  subtitle: 'Dont really know',
  authors: ['Hrr Folkien', 'Jrr Tolkien'],
  published: '12/11/1921',
  description: 'Blah blah',
  genres: ['Hullabaloo', 'Pure garbage'],
  cover: 'some url or some"in like that <script>',
};

describe('Create, Login, Check Token', () => {
  after((done) => {
    User.findOneAndRemove({ email: 'test@email.com' }, (err, res) => {
      console.log(err);
      console.log(res);
    });

    done();
  });

  it('Register -> Login -> Access Protected Route', (done) => {
    chai
      .request(server)
      .post('/register')
      .send(user_one_register)
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }
        res.should.have.status(201);
        expect(res.body.auth).to.be.true;
        done();
      });
    chai
      .request(server)
      .post('/register')
      .send(kokomo)
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }
        res.should.have.status(201);
        expect(res.body.auth).to.be.true;
        done();
      });
    chai
      .request(server)
      .post('/register')
      .send(foibles)
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }
        res.should.have.status(201);
        expect(res.body.auth).to.be.true;
        done();
      });

    it('should log user in', (done) => {
      chai
        .request(server)
        .post('/login')
        .send(user_one_login)
        .end((err, res) => {
          if (err) {
            return console.log(err);
          }
          res.should.have.status(200);
          expect(res.body.auth).to.be.true;
          res.body.should.have.property('token');

          token = res.body.token;
          done();
        });
      chai
        .request(server)
        .get('/users/dashboard')
        .set('authorization', token)
        .end((err, res) => {
          if (err) {
            return console.log(err);
          }
          res.should.have.status(200);

          expect(res.body.auth).to.be.true;
        });
    });
  });
});

describe('Log in user, create book, then create instance of that book', () => {
  // before((done) => {
  //   Book.remove({}, (err) => {
  //     console.log(err);
  //   });
  //   Instance.remove({}, (err) => {
  //     console.log(err);
  //   });
  //   User.remove({}, (err) => {
  //     console.log(err)
  //   })
  //   done();
  // });

  it('Login (User two) -> Create Book -> Create User', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(foibles)
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }
        res.should.have.status(200);
        res.body.should.have.property('token');
        const user = res.body.user;
        const token = res.body.token;
        chai
          .request(server)
          .post('/books/create')
          .set('authorization', token)
          .send(book_details)
          .end((err, res) => {
            if (err) {
              return console.log(err);
            }
            res.should.have.status(201);

            const book = res.body._id;

            chai
              .request(server)
              .post('/instances/create')
              .set('authorization', token)
              .send({
                book: book,
                user: user,
              })
              .end((err, res) => {
                if (err) {
                  return console.log(err);
                }
                res.should.have.status(201);
                done();
              });
          });
      });
  });
});

const instance = '5efb8e690dd9f00a2cf1d924';

describe('Login (user 2) -> Request to borrow a book', () => {
  it('Request book', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(kokomo)
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }
        res.should.have.status(200);
        const token = res.body.token;
        chai
          .request(server)
          .put('/instances/' + instance + '/request')
          .set('authorization', token)
          .end((err, res) => {
            if (err) {
              console.log(err);
            }
            res.should.have.status(200);
            done();
          });
      });
  });
});

describe('Login non-owner -> Attempt to accept -> Fail', () => {
  it('Fail to accept request (invalid user)', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(foibles)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        const token = res.body.token;
        chai
          .request(server)
          .put('/instances/' + instance + '/accept')
          .set('authorization', token)
          .send({ acceptedUser: kokomo._id })
          .end((err, res) => {
            if (err) {
              console.log(err);
            }
            res.should.have.status(401);
            done();
          });
      });
  });
});

describe('Login (user 3) -> Accept request to borrow book', () => {
  it('Accept request', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(kokomo)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        const token = res.body.token;
        chai
          .request(server)
          .put('/instances/' + instance + '/accept')
          .set('authorization', token)
          .send({ acceptedUser: foibles._id })
          .end((err, res) => {
            if (err) {
              console.log(err);
            }
            res.should.have.status(200);
            done();
          });
      });
  });
});
