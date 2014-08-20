var chai = require('chai'),
    expect = chai.expect;

var Firebase = require('firebase');

var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("ilIInRpOAF3ko8wk8lgynx7PQddcmdpPmXPF1DTx");
var LOGGED_IN_USER_ID = 'c1529baee3a2562e98d9659d56b7bb37';
var OTHER_USER_ID = '87c2d56b04007752bbe49888be17f1dc';
var THIRD_USER_ID = 'd3c77a8f792432ef4647c8fd5a6ca26d';
var token = tokenGenerator.createToken({
        debug: true,
        id: LOGGED_IN_USER_ID,
        simulate: true
    });

describe('Security', function() {

    beforeEach(function(done) {
        var dataRef = new Firebase("https://ben-connectid.firebaseio.com/");

        dataRef.auth(token, function(error) {
            if(error) {
                console.log("Login Failed!", error);
                done();
            } else {
                console.log("Login Succeeded!");
                done();
            }
        });
    });

    describe('acceptedInvite', function() {

        // TODO - write security rules for this once acceptedInvite is handled by the server only
    });

    describe('connection', function() {

        it('should allow logged in user to read their own connections', function(done) {
            var connection = new Firebase('https://ben-connectid.firebaseio.com/connection/' + LOGGED_IN_USER_ID);

            connection.once('value', function(data) {
                expect(true).to.be.ok;
                done();
            }, function(error) {
                expect(true).to.not.be.ok;
                done();
            });
        });

        it('should not allow logged in user to read other user\'s connections', function(done) {
            var connection = new Firebase('https://ben-connectid.firebaseio.com/connection/' + OTHER_USER_ID);

            connection.once('value', function(data) {
                expect(true).to.not.be.ok;
                done();
            }, function(error) {
                expect(true).to.be.ok;
                done();
            });
        });

        it('should allow logged in user to read other user\'s connection if that connection is themselves', function(done) {
            var connection = new Firebase('https://ben-connectid.firebaseio.com/connection/' + OTHER_USER_ID + '/' + LOGGED_IN_USER_ID);

            connection.once('value', function(data) {
                expect(true).to.be.ok;
                done();
            }, function(error) {
                expect(true).to.not.be.ok;
                done();
            });
        });

        it('should not allow logged in user to read other user\'s connection if that connection is not themselves', function(done) {
            var connection = new Firebase('https://ben-connectid.firebaseio.com/connection/' + OTHER_USER_ID + '/' + THIRD_USER_ID);

            connection.once('value', function(data) {
                expect(true).to.not.be.ok;
                done();
            }, function(error) {
                expect(true).to.be.ok;
                done();
            });
        });

        it('should allow logged in user to write to their own connections', function(done) {
            var connection = new Firebase('https://ben-connectid.firebaseio.com/connection/' + LOGGED_IN_USER_ID);

            connection.set({
                a: 'b'
            }, function(error) {
                expect(error).to.not.be.ok;
                done();
            });
        });

        it('should not allow the logged in user to write to other user\'s connections', function(done) {
            var connection = new Firebase('https://ben-connectid.firebaseio.com/connection/' + OTHER_USER_ID + '/' + THIRD_USER_ID);

            connection.set({
                a: 'b'
            }, function(error) {
                expect(error).to.be.ok;
                done();
            });
        });

        it('should allow logged in user to write to other user\'s connections if that connection is the logged in user and already exists', function(done) {
            var connection = new Firebase('https://ben-connectid.firebaseio.com/connection/' + OTHER_USER_ID + '/' + LOGGED_IN_USER_ID);

            connection.set({
                a: 'b'
            }, function(error) {
                expect(error).to.not.be.ok;
                done();
            });
        });
    });
});