import request from 'supertest';
import app from './server';

describe('Express Server', () => {
  it('should return a 200 status for the home route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
