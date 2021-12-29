/* eslint-disable no-undef */
import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/App';
import MongoDB from '../src/components/mongoDB';

chai.use(chaiHttp);
chai.should();

const invalidToken = {
  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

const userToken = {
  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxYzkyMWUyZmYwZWY2Y2I2NjJlZTE3YSIsImZ1bGxOYW1lIjoiTGlzYSBOZ3V54buFbiIsImVtYWlsIjoibGlzYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE2NDA3OTg4NTQsImV4cCI6MTY0Mzc5ODg1NH0._cws34bGbwLtlq40A-TjnDbVmrRq4Rf7zzXqRfOFVl0',
};

// const adminToken = {
//   'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxYzkyMTgzZmYwZWY2Y2I2NjJlZTE3NyIsImZ1bGxOYW1lIjoiWHXDom4gxJDhu6ljIiwiZW1haWwiOiJ4ZHRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MDc5ODIzOSwiZXhwIjoxNjQzNzk4MjM5fQ.jWQQVEiGdEvDDlWn_21wx3i6Dml35AQRsOy3Gvkw2gY',
// };

const bookId: string = '61c44215e0ae9c56ceb25b31';

describe('Book API', () => {
  before(() => {
    MongoDB.connect()
      .then(() => {
        console.log('[MongoDB] - Connect to database successfully.');
      })
      .catch((error: any) => console.log(error));
  });

  beforeEach(() => {
    // done();
  });
  /*
   * Test the /GET route
   */
  describe('No token provided', () => {
    it('GET /api/book should throw forbidden error', (done) => {
      chai.request(app)
        .get('/api/book')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('GET /api/book/:id should throw forbidden error', (done) => {
      chai.request(app)
        .get(`/api/book/${bookId}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('POST /api/book should throw forbidden error', (done) => {
      chai.request(app)
        .post('/api/book')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('PUT /api/book/:id should throw Forbidden error', (done) => {
      chai.request(app)
        .put(`/api/book/${bookId}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('PUT /api/book/:id/image should throw forbidden error', (done) => {
      chai.request(app)
        .put(`/api/book/${bookId}/image`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });

    it('DELETE /api/book/:id should throw Forbidden error', (done) => {
      chai.request(app)
        .delete(`/api/book/${bookId}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('No token provided');
          done();
        });
    });
  });

  describe('Invalid token', () => {
    it('GET /api/book should throw unauthorized error', (done) => {
      chai.request(app)
        .get('/api/book')
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('GET /api/book/:id should throw unauthorized error', (done) => {
      chai.request(app)
        .get(`/api/book/${bookId}`)
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('POST /api/book should throw unauthorized error', (done) => {
      chai.request(app)
        .post('/api/book')
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('PUT /api/book/:id should throw unauthorized error', (done) => {
      chai.request(app)
        .put(`/api/book/${bookId}`)
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('PUT /api/book/:id/image should throw unauthorized error', (done) => {
      chai.request(app)
        .put(`/api/book/${bookId}/image`)
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });

    it('DELETE /api/book/:id should throw unauthorized error', (done) => {
      chai.request(app)
        .delete(`/api/book/${bookId}`)
        .set(invalidToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal('Unauthorized');
          done();
        });
    });
  });

  describe('Token with USER role', () => {
    beforeEach((done) => {
      done();
    });

    it('GET /api/book should throw unauthorized error', (done) => {
      chai.request(app)
        .get('/api/book')
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.equal('Success');
          done();
        });
    });

    it('GET /api/book/:id should throw unauthorized error', (done) => {
      chai.request(app)
        .get(`/api/book/${bookId}`)
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.equal('Success');
          done();
        });
    });

    it('POST /api/book should throw not allowed error', (done) => {
      chai.request(app)
        .post('/api/book')
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('You are not allowed');
          done();
        });
    });

    it('PUT /api/book/:id should throw not allowed error', (done) => {
      chai.request(app)
        .put(`/api/book/${bookId}`)
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('You are not allowed');
          done();
        });
    });

    it('PUT /api/book/:id/image should throw not allowed error', (done) => {
      chai.request(app)
        .put(`/api/book/${bookId}/image`)
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('You are not allowed');
          done();
        });
    });

    it('DELETE /api/book/:id should throw not allowed error', (done) => {
      chai.request(app)
        .delete(`/api/book/${bookId}`)
        .set(userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.be.equal('You are not allowed');
          done();
        });
    });
  });

  // describe('Token with ADMIN role', () => {
  //   it('GET /api/book should throw unauthorized error', (done) => {
  //     chai.request(app)
  //       .get('/api/book')
  //       .set(adminToken)
  //       .end((err, res) => {
  //         res.should.have.status(401);
  //         res.body.error.should.be.equal('Unauthorized');
  //         done();
  //       });
  //   });

  //   it('GET /api/book/:id should throw unauthorized error', (done) => {
  //     chai.request(app)
  //       .get(`/api/book/${bookId}`)
  //       .set(adminToken)
  //       .end((err, res) => {
  //         res.should.have.status(401);
  //         res.body.error.should.be.equal('Unauthorized');
  //         done();
  //       });
  //   });

  //   it('POST /api/book should throw unauthorized error', (done) => {
  //     chai.request(app)
  //       .post('/api/book')
  //       .set(adminToken)
  //       .end((err, res) => {
  //         res.should.have.status(401);
  //         res.body.error.should.be.equal('Unauthorized');
  //         done();
  //       });
  //   });

  //   it('PUT /api/book/:id should throw unauthorized error', (done) => {
  //     chai.request(app)
  //       .put(`/api/book/${bookId}`)
  //       .set(adminToken)
  //       .end((err, res) => {
  //         res.should.have.status(401);
  //         res.body.error.should.be.equal('Unauthorized');
  //         done();
  //       });
  //   });

  //   it('PUT /api/book/:id/image should throw unauthorized error', (done) => {
  //     chai.request(app)
  //       .put(`/api/book/${bookId}/image`)
  //       .set(adminToken)
  //       .end((err, res) => {
  //         res.should.have.status(401);
  //         res.body.error.should.be.equal('Unauthorized');
  //         done();
  //       });
  //   });

  //   it('DELETE /api/book/:id should throw unauthorized error', (done) => {
  //     chai.request(app)
  //       .delete(`/api/book/${bookId}`)
  //       .set(adminToken)
  //       .end((err, res) => {
  //         res.should.have.status(401);
  //         res.body.error.should.be.equal('Unauthorized');
  //         done();
  //       });
  //   });
  // });
});
