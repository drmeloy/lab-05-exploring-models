const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');

const newDrink = {
  name: 'coffee',
  isLiquid: true,
  isAlcoholic: false,
  size: '16 oz',
  bestEnjoyedWhen: 'morning'
};

describe('application routes', () => {

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  it('has a home get route', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ drinks: ['coffee', 'orange juice', 'milk', 'beer', 'cider', 'wine'] });
      });
  });

  it('has a /drinks post route', async(done) => {
    return request(app)
      .post('/drinks')
      .send(newDrink)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          bestEnjoyedWhen: 'morning',
          createdAt: expect.any(String),
          isAlcoholic: false,
          isLiquid: true,
          name: 'coffee',
          size: '16 oz',
          updatedAt: expect.any(String),
        });
      })
      .then(() => {
        done();
      });
  });

  it('has a /drinks get route', () => {
    return request(app)
      .post('/drinks')
      .send(newDrink)
      .then(() => {
        return request(app)
          .get('/drinks');
      })
      .then(res => {
        expect(res.body).toEqual([{
          __v: 0,
          _id: expect.any(String),
          bestEnjoyedWhen: 'morning',
          createdAt: expect.any(String),
          isAlcoholic: false,
          isLiquid: true,
          name: 'coffee',
          size: '16 oz',
          updatedAt: expect.any(String),
        }]);
      });
  });

  it('has a /drinks put route', async(done) => {
    return request(app)
      .post('/drinks')
      .send(newDrink)
      .then(drink => {
        return request(app)
          .put(`/drinks/${drink.body._id}`)
          .send({ name: 'hazy ipa' });
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: `${res.body._id}`,
          bestEnjoyedWhen: 'morning',
          createdAt: expect.any(String),
          isAlcoholic: false,
          isLiquid: true,
          name: 'hazy ipa',
          size: '16 oz',
          updatedAt: expect.any(String),
        });
      })
      .then(() => {
        done();
      });
  });

  it('has a /drinks delete route', () => {
    return request(app)
      .post('/drinks')
      .send(newDrink)
      .then(drink => {
        return request(app)
          .delete(`/drinks/${drink.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              __v: 0,
              _id: expect.any(String),
              bestEnjoyedWhen: 'morning',
              createdAt: expect.any(String),
              isAlcoholic: false,
              isLiquid: true,
              name: 'coffee',
              size: '16 oz',
              updatedAt: expect.any(String),
            });
          });
      });
  });
});
