/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';
import app from '../src/App';
import MongoDB from '../src/components/mongoDB';
// import db from '../src/models/index';
import config from '../src/config';
import { mockBookData } from './mocks/book.data';
import { mockUserData } from './mocks/user.data';
import { initTestData, removeTestData } from './helpers/book.helper';

const {
  invalidToken,
  userToken,
  adminToken,
} = mockUserData;

const {
  books,
  noExistId,
} = mockBookData;

chai.use(chaiHttp);
chai.should();

describe('Book API', () => {
  before(async () => {
    const { mongoDB: { host, port, testDatabase } } = config;
    const connectString: string = `mongodb://${host}:${port}/${testDatabase}`;
    await MongoDB.connect(connectString);
    await initTestData();
  });

  after(async () => {
    await removeTestData();
  });

  describe('GET /api/book', () => {
    it('should throw forbidden error when no token provided', (done) => {
      chai.request(app)
        .get('/api/book')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('should throw unauthorized error when invalid token', (done) => {
      chai.request(app)
        .get('/api/book')
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('should get all books with user role', (done) => {
      chai.request(app)
        .get('/api/book')
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Success');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.property('title');
            expect(res.body.data[0]).to.have.property('image');
            expect(res.body.data[0]).to.have.property('category');
            expect(res.body.data[0]).to.have.property('quantity');
            expect(res.body.data[0]).to.have.property('price');
            expect(res.body.data[0]).to.have.property('description');
          }
          done();
        });
    });

    it('should get all books with admin role', (done) => {
      chai.request(app)
        .get('/api/book')
        .set(adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Success');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.property('title');
            expect(res.body.data[0]).to.have.property('image');
            expect(res.body.data[0]).to.have.property('category');
            expect(res.body.data[0]).to.have.property('quantity');
            expect(res.body.data[0]).to.have.property('price');
            expect(res.body.data[0]).to.have.property('description');
          }
          done();
        });
    });

    it('should get books by limit skip', (done) => {
      chai.request(app)
        .get('/api/book?limit=2&skip=1')
        .set(adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Success');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be.equal(2);
          expect(res.body.data[0]).to.have.property('_id');
          expect(res.body.data[0]._id).to.be.equal(books[1].id);
          expect(res.body.data[0]).to.have.property('title');
          expect(res.body.data[0]).to.have.property('image');
          expect(res.body.data[0]).to.have.property('category');
          expect(res.body.data[0]).to.have.property('quantity');
          expect(res.body.data[0]).to.have.property('price');
          expect(res.body.data[0]).to.have.property('description');
          done();
        });
    });
  });

  describe('GET /api/book/:id', () => {
    it('should throw forbidden error when no token provided', (done) => {
      chai.request(app)
        .get(`/api/book/${books[0].id}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('should throw unauthorized error when invalid token', (done) => {
      chai.request(app)
        .get(`/api/book/${books[0].id}`)
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('should get book detail with user role', (done) => {
      chai.request(app)
        .get(`/api/book/${books[0].id}`)
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.equal('Success');
          done();
        });
    });

    it('should get book detail with admin role', (done) => {
      chai.request(app)
        .get(`/api/book/${books[1].id}`)
        .set(adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('title');
          expect(res.body.data).to.have.property('image');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('quantity');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('description');
          done();
        });
    });

    it('should get null with admin role and no exist book', (done) => {
      chai.request(app)
        .get(`/api/book/${noExistId}`)
        .set(adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Success');
          expect(res.body.data).to.be.equal(null);
          done();
        });
    });
  });

  describe('POST /api/book', () => {
    it('should throw forbidden error when no token provided', (done) => {
      chai.request(app)
        .post('/api/book')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('should throw unauthorized error when invalid token', (done) => {
      chai.request(app)
        .post('/api/book')
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('should throw not allowed error with user role', (done) => {
      chai.request(app)
        .post('/api/book')
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('You are not allowed');
          done();
        });
    });

    it('should throw validate error with admin role and no request data provided', (done) => {
      chai.request(app)
        .post('/api/book')
        .set(adminToken)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should create new book successfully with admin role', (done) => {
      chai.request(app)
        .post('/api/book')
        .set(adminToken)
        .set('content-type', 'multipart/form-data')
        .field('title', books[1].title)
        .field('category', books[1].category)
        .field('quantity', books[1].quantity)
        .field('price', books[1].price)
        .field('description', books[1].description)
        .attach('image', fs.readFileSync(path.join(__dirname, './images/test1.jpg')), 'test1.jpg')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.equal('Success');
          done();
        });
    });
  });

  describe('PUT /api/book/:id', () => {
    it('should throw forbidden error when no token provided', (done) => {
      chai.request(app)
        .put(`/api/book/${books[0].id}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('should throw unauthorized error when invalid token', (done) => {
      chai.request(app)
        .put(`/api/book/${books[0].id}`)
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('should throw not allowed error with user role', (done) => {
      chai.request(app)
        .put(`/api/book/${books[0].id}`)
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('You are not allowed');
          done();
        });
    });

    it('should update book successfully with admin role', (done) => {
      chai.request(app)
        .put(`/api/book/${books[1].id}`)
        .set(adminToken)
        .send({
          title: books[0].title,
          category: books[0].category,
          quantity: books[0].quantity,
          price: books[0].price,
          description: books[0].description,
        })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('title');
          expect(res.body.data).to.have.property('image');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('quantity');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('description');
          expect(res.body.data.title).to.equal(books[0].title);
          expect(res.body.data.category).to.equal(books[0].category);
          expect(res.body.data.quantity).to.equal(books[0].quantity);
          expect(res.body.data.price).to.equal(books[0].price);
          expect(res.body.data.description).to.equal(books[0].description);
          done();
        });
    });

    it('should throw validate error with admin role and invalid category', (done) => {
      chai.request(app)
        .put(`/api/book/${books[1].id}`)
        .set(adminToken)
        .send({ category: 'film' })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).to.be.equal('"category" must be one of [drama, comedy, sport]');
          done();
        });
    });

    it('should throw validate error with admin role and not allowed field', (done) => {
      chai.request(app)
        .put(`/api/book/${books[1].id}`)
        .set(adminToken)
        .send({ otherField: 'film' })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).to.be.equal('"otherField" is not allowed');
          done();
        });
    });

    it('should throw not found error with admin role and no exist book', (done) => {
      chai.request(app)
        .put(`/api/book/${noExistId}`)
        .set(adminToken)
        .send({ category: 'drama' })
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.error).to.be.equal('Could not find book');
          done();
        });
    });
  });

  describe('PUT /api/book/:id/image', () => {
    it('should throw forbidden error when no token provided', (done) => {
      chai.request(app)
        .put(`/api/book/${books[0].id}/image`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('should throw unauthorized error when invalid token', (done) => {
      chai.request(app)
        .put(`/api/book/${books[0].id}/image`)
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('should throw not allowed error with user role', (done) => {
      chai.request(app)
        .put(`/api/book/${books[0].id}/image`)
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('You are not allowed');
          done();
        });
    });

    it('should throw invalid request data with admin role and no image provided', (done) => {
      chai.request(app)
        .put(`/api/book/${books[1].id}/image`)
        .set(adminToken)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should should update book image successfully with admin role', (done) => {
      chai.request(app)
        .put(`/api/book/${books[1].id}/image`)
        .set(adminToken)
        .attach('image', fs.readFileSync(path.join(__dirname, './images/test1.jpg')), 'test1.jpg')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('title');
          expect(res.body.data).to.have.property('image');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('quantity');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('description');
          done();
        });
    });
  });

  describe('DELETE /api/book/:id', () => {
    it('should throw forbidden error when no token provided', (done) => {
      chai.request(app)
        .delete(`/api/book/${books[0].id}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('should throw unauthorized error when invalid token', (done) => {
      chai.request(app)
        .delete(`/api/book/${books[0].id}`)
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('should throw not allowed error with user role', (done) => {
      chai.request(app)
        .delete(`/api/book/${books[0].id}`)
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('You are not allowed');
          done();
        });
    });

    it('should throw not found error with admin role and no exist book', (done) => {
      chai.request(app)
        .delete(`/api/book/${noExistId}`)
        .set(adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.error).to.be.equal('Could not find book');
          done();
        });
    });

    it('should delete book successfully with admin role', (done) => {
      chai.request(app)
        .delete(`/api/book/${books[1].id}`)
        .set(adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.equal('Success');
          done();
        });
    });
  });
});
