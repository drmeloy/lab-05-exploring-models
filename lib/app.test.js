const request = require('supertest');
const app = require('./app');

describe('application routes', () => {
  it('has a home get route', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ drinks: ['coffee', 'orange juice', 'milk', 'beer', 'cider', 'wine'] });
      });
  });

  it('has a /beers get route', () => {
    return request(app)
      .get('/beers')
      .then(res => {
        expect(res.body).toEqual(['ipa', 'amber', 'stout', 'pale ale', 'porter', 'saison']);
      });
  });

  it('has a /beers post route', () => {
    return request(app)
      .post('/beers')
      .send({ beer: 'pilsner' })
      .then(res => {
        expect(res.body).toEqual({ beer: 'pilsner' });
      });
  });

  it('has a /beers put route', () => {
    return request(app)
      .put('/beers')
      .send({ beer: 'hazy ipa' })
      .then(res => {
        expect(res.body).toEqual({ beer: 'hazy ipa' });
      });
  });

  it('has a /beers delete route', () => {
    return request(app)
      .delete('/beers')
      .send({ beer: 'hazy ipa' })
      .then(res => {
        expect(res.body).toEqual({ beer: 'hazy ipa' });
      });
  });
});
