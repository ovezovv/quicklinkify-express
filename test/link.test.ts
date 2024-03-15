import supertest from 'supertest';
import { app } from '../src'
import { Link } from '../src/models/Link';

let username = "test-user";
let url = "testurl.com"

describe("Quicklinkify API", () => {
  it('POST /api/short -> short create record', async () => {
    const response = await supertest(app).post('/api/short').send({
      username,
      url
    });

    expect(response.status).toBe(200);
    expect(response.body.link.url).toEqual(`https://${url}`);
    expect(response.body.link.username).toEqual(username);
  })

  it('GET /api/links/:username', async () => {

    const response = await supertest(app).get(`/api/links/${username}`);

    expect(response.status).toBe(200);
    expect(response.body.links.length).toEqual(1);
  });
});
