const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert')
const server = require('./index')
const should = chai.should()

chai.use(chaiHttp)

describe('/', () => {
  it('should return basic service info', done => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status')
        res.body.should.have.property('timestamp')
        res.body.should.have.property('users')
        done()
      })
  })
})

describe('/list', () => {
  it('should return a list of online users', done => {
    chai.request(server)
      .get('/list')
      .end((err, res) => {
        res.should.have.status(200)
        JSON.parse(res.text).should.be.a('array')
        done()
      })
  })
})

describe('/discover', () => {
  it('should send a free users socket ID or return no-free-users', done => {
    chai.request(server)
      .get('/discover/fakeUserId')
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.be.a('string')

        const discoverResponse = res
        chai.request(server)
          .get('/list')
          .end((err, res) => {
            assert(discoverResponse.text, 'no-free-users') || JSON.parse(res.text).filter(x => x.id === discoverResponse.text)[0]
            done()
          })
      })
  })
})
