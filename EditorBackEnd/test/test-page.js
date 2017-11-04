var expect = require('chai').expect;
var request = require('request');

const BASE_URL = 'http://localhost:8086/';

const MOCK_EDITOR = {
    "Username": "dddd",
    "Name": "Sampath Sandaruwan",
    "Email": "sampa123@yahoo.com"
};

describe('Backend API Testing', function () {
    // Define Editors
    describe('Editors', function () {
        it('Returns a 200 response code when GET /editors', function (done) {
            request(BASE_URL + 'editors', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('adds a new editor when  post /editors', function (done) {
            request.post(
                {
                    url: BASE_URL + 'editors',
                    body: MOCK_EDITOR,
                    json: true
                },
                function(error,response,body){
                    expect(response.statusCode).to.equal(200);
                    done();
                }

            );
        });
        it('Returns an array of editor objects', function (done) {
            request(BASE_URL + 'editors', function (error, response, body) {
                expect(JSON.parse(response.body)).to.be.an('array');
                done();
            });
        });

    });

    // Define Contents
    describe('Content', function () {
        it('Returns a 200 response code when GET /contents', function (done) {
            request(BASE_URL + 'contents', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('Returns an array of contents objects', function (done) {
            request(BASE_URL + 'contents', function (error, response, body) {
                expect(JSON.parse(response.body)).to.be.an('array');
                done();
            });
        });

    });

    // Define Users
    describe('Users', function () {
        it('Returns a 200 response code when GET /users', function (done) {
            request(BASE_URL + 'users', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('Returns an array of users objects', function (done) {
            request(BASE_URL + 'users', function (error, response, body) {
                expect(JSON.parse(response.body)).to.be.an('array');
                done();
            });
        });

    });

});
