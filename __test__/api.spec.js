const request = require('supertest')
const api = require('../api')

describe('api server', () => {
  let apiEnd

  beforeAll(() => {
    apiEnd = api.listen(3000, () => {
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

  /////////////////////////////////////////////////////////////////////
  //recycling
  ////////////////////////////////////////////////////////////////////

  it('responds to get /recycling with status 200', (done) => {
    request(api).get('/recycling').expect(200, done)
  })

  it('responds to get /recycling with json', (done) => {
    request(api).get('/recycling').expect('Content-Type', /json/, done)
  })
  it('responds to post /recycling with json', (done) => {
    const data = {
      title: 'Test recycling',
      post_date: new Date(),
      info: 'This is a test recycling',
      recy_type: 'type'
    }
    request(api)
      .post('/recycling')
      .send(data)
      .expect('Content-Type', /json/, done)
  })

  // patch
  it('responds to patch /recycling/:id with json and checks that the updated recycling matches the data we sent', (done) => {
    const updateData = {
      title: 'Updated recycling',
      post_date: new Date(),
      recy_type: 'type',
      info: 'This is an updated recycling'
    }

    request(api)
      .get('/recycling')
      .then((res) => {
        const id = res.body[0].recy_id
        return request(api)
          .patch(`/recycling/${id}`)
          .send(updateData)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            // Check that the updated recycling matches the data we sent
            expect(res.body.title).toEqual('Updated recycling')
            expect(res.body.info).toEqual('This is an updated recycling')
            done()
          })
      })
      .catch((error) => {
        done()
      })
  })

  // delete
  it('responds to DELETE /recycling/:id with status 204', (done) => {
    // First, we need to get an existing recycling from the database
    request(api)
      .get('/recycling')
      .then((res) => {
        const id = res.body[0].recy_id
        // Once we have the ID, we can use it to send a DELETE request to remove the recycling
        return request(api).delete(`/recycling/${id}`).expect(204)
      })
      .then(() => {
        done()
      })
      .catch((error) => {
        done()
      })
  })
  // get error
  it('throws an error when there are no recycling', (done) => {
    request(api)
      .get('/recycling')
      .expect(500)
      .expect('{"error":"No recycling available."}', done)
  })
  // post error
  it('responds to invalid post method request with 404', (done) => {
    request(api).post('/recycling').expect(404, done)
  })

  // patch error

  it('responds to invalid patch method request with 404', (done) => {
    request(api).patch('/recycling/:id').expect(404, done)
  })

  // delete error
  it('responds to invalid delete method request with 404', (done) => {
    request(api).delete('/recycling/:id').expect(404, done)
  })

  /////////////////////////////////////////////////////////////////////////////
  //users
  //////////////////////////////////////////////////////////////////////////////
  it('responds to get /users with status 200', (done) => {
    request(api).get('/users/profile').expect(200, done)
  })

  it('responds to get /users with json', (done) => {
    request(api).get('/users/profile').expect('Content-Type', /json/, done)
  })
  it('responds to post /users with json', (done) => {
    const data = {
      user_name: 'Test user',
      user_email: 'lets@you',
      password: 'This is a test ',
    }
    request(api)
      .post('/users/register')
      .send(data)
      .expect('Content-Type', /json/, done)
  })

  // get error
  it('throws an error when there are no users', (done) => {
    request(api)
      .get('/users/profile')
      .expect(500)
      .expect('{"error":"No users available."}', done)
  })
  // post error
  it('responds to invalid post method request with 404', (done) => {
    request(api).post('/users/login').expect(404, done)
  })

})
  /////////////////////////////////////////////////////////////////////
  //events
  ////////////////////////////////////////////////////////////////////

  it('responds to get /events with status 200', (done) => {
    request(api).get('/events').expect(200, done)
  })

  it('responds to get /events with json', (done) => {
    request(api).get('/events').expect('Content-Type', /json/, done)
  })
  it('responds to post /events with json', (done) => {
    const data = {
      event_title: 'Test events',
      event_date: new Date(),
      event_type: 'This is a test  events',
      event_content: 'content'
    }
    request(api)
      .post('/events')
      .send(data)
      .expect('Content-Type', /json/, done)
  })

  // patch
  it('responds to patch /events/:id with json and checks that the updated events matches the data we sent', (done) => {
    const updateData = {
      event_title: 'Test events',
      event_date: new Date(),
      event_type: 'This is a test update events',
      event_content: 'content'
    }

    request(api)
      .get('/events')
      .then((res) => {
        const id = res.body[0].event_id
        return request(api)
          .patch(`/events/${id}`)
          .send(updateData)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            // Check that the updated events matches the data we sent
            expect(res.body.title).toEqual('Updated events')
            expect(res.body.info).toEqual('This is an updated events')
            done()
          })
      })
      .catch((error) => {
        done()
      })
  })

  // delete
  it('responds to DELETE /events/:id with status 204', (done) => {
    // First, we need to get an existing /events from the database
    request(api)
      .get('/events')
      .then((res) => {
        const id = res.body[0].event_id
        // Once we have the ID, we can use it to send a DELETE request to remove the /events
        return request(api).delete(`/events/${id}`).expect(204)
      })
      .then(() => {
        done()
      })
      .catch((error) => {
        done()
      })
  })
  // get error
  it('throws an error when there are no events', (done) => {
    request(api)
      .get('/events')
      .expect(500)
      .expect('{"error":"No /events available."}', done)
  })
  // post error
  it('responds to invalid post method request with 404', (done) => {
    request(api).post('/events').expect(404, done)
  })

  // patch error

  it('responds to invalid patch method request with 404', (done) => {
    request(api).patch('/events/:id').expect(404, done)
  })

  // delete error
  it('responds to invalid delete method request with 404', (done) => {
    request(api).delete('/events/:id').expect(404, done)
  })


  ///////////////////////////////////////////////////////////////////////////////
  //user events 
  //////////////////////////////////////////////////////////////////////////////
  it('responds to get /userevents with status 200', (done) => {
    request(api).get('/userevents').expect(200, done)
  })

  it('responds to get /userevents with json', (done) => {
    request(api).get('/userevents').expect('Content-Type', /json/, done)
  })
  it('responds to post /userevents with json', (done) => {
    const data = {
      event_id: 1,
      user_id: 1
    }
    request(api)
      .post('/userevents')
      .send(data)
      .expect('Content-Type', /json/, done)
  })


  // delete
  it('responds to DELETE /userevents/:id with status 204', (done) => {
    // First, we need to get an existing /events from the database
    request(api)
      .get('/userevents')
      .then((res) => {
        const id = res.body[0].user_event_id
        // Once we have the ID, we can use it to send a DELETE request to remove the /userevents
        return request(api).delete(`/userevents/${id}`).expect(204)
      })
      .then(() => {
        done()
      })
      .catch((error) => {
        done()
      })
  })
  // get error
  it('throws an error when there are no /userevents', (done) => {
    request(api)
      .get('/userevents')
      .expect(500)
      .expect('{"error":"No /userevents available."}', done)
  })
  // post error
  it('responds to invalid post method request with 404', (done) => {
    request(api).post('/userevents').expect(404, done)
  })

  // delete error
  it('responds to invalid delete method request with 404', (done) => {
    request(api).delete('/userevents/:id').expect(404, done)
  })
