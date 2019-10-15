var assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect;
const server = require('../index')

chai.use(chaiHttp)

//Some data taken from the database to ensure it's working
var currentJWT
const clientId = 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
const clientName = 'Manning'
const clientEmail = 'manningblankenship@quotezart.com'
const policyId = '64cceef9-3a01-49ae-a23b-3761b604800b'

describe('AXA Backend assesment', () => {

  //Login test
  it('Should login', (done) => {
    chai.request(server)
      .post('/api/login/')
	  .set('content-type', 'application/json')
	  .send({email: clientEmail})
      .end((err, result) => {
      	result.should.have.status(200)
      	expect(result.body.token).to.be.a('string')
      	currentJWT = result.body.token
        done()
      })
  })

  //Get client by ID
  it('Should get client by ID', (done) => {
    chai.request(server)
      .get(`/api/clients/id/${clientId}`)
      .set('Authorization', `Bearer ${currentJWT}`)
      .end((err, result) => {
      	result.should.have.status(200)
      	expect(result.body.client.id).to.equal(clientId);

        done()
      })
  })

  //Get client by name
  it('Should get client by name', (done) => {
    chai.request(server)
      .get(`/api/clients/name/${clientName}`)
      .set('Authorization', `Bearer ${currentJWT}`)
      .end((err, result) => {
      	result.should.have.status(200)
      	expect(result.body.client.name).to.equal(clientName);

        done()
      })
  })

  //Get list of policies assigned to a client name
  it('Should get policies linked to client name', (done) => {
    chai.request(server)
      .get(`/api/policies/client/${clientName}`)
      .set('Authorization', `Bearer ${currentJWT}`)
      .end((err, result) => {
      	result.should.have.status(200)
      	expect(result.body).to.have.property('clients')
      	expect(result.body).to.have.property('policies')

        done()
      })
  })

  //Get the user data related to a given policy ID
  it('Should get user linked to a policy number', (done) => {
    chai.request(server)
      .get(`/api/policies/${policyId}`)
      .set('Authorization', `Bearer ${currentJWT}`)
      .end((err, result) => {
      	result.should.have.status(200)
      	expect(result.body).to.have.property('id')
      	expect(result.body).to.have.property('email')

        done()
      })
  })
})
