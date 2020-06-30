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
  email: 'test@email.com',
  password: '123@abc',
};

const user_one_register = {
  email: 'test@email.com',
  username: 'test',
  password: '123@abc',
};

const user_two = {
  username: 'bananas',
  email: 'kokomo@kokomo.com',
  password: 'kokomo123',
};

const user_three = {
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
  cover: 'some url or some"in like that',
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
      .post('/auth/register')
      .send(user_one_register)
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
        .post('/auth/login')
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

// describe('Log in user, create book, then create instance of that book', () => {
//   // after((done) => {
//   //   Book.remove({}, (err) => {
//   //     console.log(err);
//   //   });
//   //   Instance.remove({}, (err) => {
//   //     console.log(err);
//   //   });
//   //   done();
//   // });

//   it('Login -> Create Book -> Create User', (done) => {
//     chai
//       .request(server)
//       .post('/auth/login')
//       .send(user_two)
//       .end((err, res) => {
//         if (err) {
//           return console.log(err);
//         }
//         res.should.have.status(200);
//         res.body.should.have.property('token');
//         const user = res.body.user;
//         const token = res.body.token;
//         chai
//           .request(server)
//           .post('/books/create')
//           .set('authorization', token)
//           .send(book_details)
//           .end((err, res) => {
//             if (err) {
//               return console.log(err);
//             }
//             res.should.have.status(201);

//             const book = res.body._id;

//             chai
//               .request(server)
//               .post('/instances/create')
//               .set('authorization', token)
//               .send({
//                 book: book,
//                 user: user,
//               })
//               .end((err, res) => {
//                 if (err) {
//                   return console.log(err);
//                 }
//                 res.should.have.status(201);
//                 done();
//               });
//           });
//       });
//   });
// });

const instance = '5efaa78bc653dc4f70064089';

describe('Request to borrow a book, accept request', () => {
  it('Request book', (done) => {
    chai
      .request(server)
      .post('/auth/login')
      .send(user_two)
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }
        res.should.have.status(200);
        console.log(res.body);
        const user = res.body.user._id;
        const token = res.body.token;
        chai
          .request(server)
          .put('/instances/5efaa78bc653dc4f70064089/request')
          .set('authorization', token)
          .send({ user: user })
          .end((err, res) => {
            if (err) {
              console.log(err);
            }
            res.should.have.status(200);

            chai
              .request(server)
              .put('/instances/5efaa78bc653dc4f70064089/accept')
              .set('authorization', token)
              .send({ acceptedUser: user })
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
});
