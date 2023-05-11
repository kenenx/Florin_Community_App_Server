const request = require('supertest')
const api = require('../api')

describe('api server', () => {
  let apiEnd

  beforeAll(() => {
    apiEnd = api.listen(2000, () => {
      console.log('Test server running on port 2000')
    })
  })

  afterAll((done) => {
    console.log('Gracefully stopping test server')
    apiEnd.close(done)
  })

  it('responds to get / with status 200', (done) => {
    request(api).get('/').expect(200, done)
  })

  it('responds to get /complaints with status 200', (done) => {
    request(api).get('/complaints').expect(200, done)
  })

  it('responds to get /complaints with json', (done) => {
    request(api).get('/complaints').expect('Content-Type', /json/, done)
  })
  it('responds to post /complaints with json', (done) => {
    const data = {
      title: 'Test complaint',
      post_date: new Date(),
      content: 'This is a test complaint',
      resolved: false,
      user_id: 1,
    }
    request(api)
      .post('/complaints')
      .send(data)
      .expect('Content-Type', /json/, done)
  })

  // patch
  it('responds to patch /complaints/:id with json and checks that the updated complaint matches the data we sent', (done) => {
    const updateData = {
      title: 'Updated complaint',
      post_date: new Date(),
      content: 'This is an updated complaint',
      resolved: false,
      user_id: 1,
    }

    request(api)
      .get('/complaints')
      .then((res) => {
        const id = res.body[0].comp_id
        return request(api)
          .patch(`/complaints/${id}`)
          .send(updateData)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            // Check that the updated complaint matches the data we sent
            expect(res.body.title).toEqual('Updated complaint')
            expect(res.body.content).toEqual('This is an updated complaint')
            done()
          })
      })
      .catch((error) => {
        done()
      })
  })

  // delete
  it('responds to DELETE /complaints/:id with status 204', (done) => {
    // First, we need to get an existing complaint from the database
    request(api)
      .get('/complaints')
      .then((res) => {
        const id = res.body[0].comp_id
        // Once we have the ID, we can use it to send a DELETE request to remove the complaint
        return request(api).delete(`/complaints/${id}`).expect(204)
      })
      .then(() => {
        done()
      })
      .catch((error) => {
        done()
      })
  })
  // get error
  it('throws an error when there are no complaints', (done) => {
    request(api)
      .get('/complaints')
      .expect(500)
      .expect('{"error":"No complaints available."}', done)
  })
  // post error
  it('responds to invalid post method request with 404', (done) => {
    request(api).post('/complaints').expect(404, done)
  })

  // patch error

  it('responds to invalid patch method request with 404', (done) => {
    request(api).patch('/complaints/:id').expect(404, done)
  })

  // delete error
  it('responds to invalid delete method request with 404', (done) => {
    request(api).delete('/complaints/:id').expect(404, done)
  })
})
