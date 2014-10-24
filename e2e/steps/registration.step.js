var firebaseTokenGenerator = require('firebase-token-generator'),
    Firebase = require('firebase'),
    q = require('q'),
    WAIT = 15000;

function deRegister(email, mobile, browser) {
    var deferred = q.defer();

    console.log('STEP: Registration.deRegister', email, mobile);

    browser
        .url('http://localhost:9001')
        .waitForElementVisible('#mobile', WAIT)
        .executeAsync(function(email, mobile) {
            var ref = new Firebase('https://connectid-qa.firebaseio.com'),
                authClient = new FirebaseSimpleLogin(ref, function(error, user) {});

            return authClient.removeUser(email, mobile, function() {
                return true;
            });
        }, [email, mobile]);

    var tokenGenerator = new firebaseTokenGenerator('lcFjrIMnZ4GSlQyXk2JBQcrjov399xRCJ3MJg5rS'),
        serverToken = tokenGenerator.createToken({
            debug: true,
            uid: '1234',
            simulate: true
        }, {
            admin: true
        });

    var ref = new Firebase('https://connectid-qa.firebaseio.com');

    ref.authWithCustomToken(serverToken, function (error) {
        if (error) {
            console.log('Login Failed!' + error);
            deferred.resolve();
        } else {
            ref.child('registeredsubscribernumber/' + mobile).remove();
            ref.child('registeredemailaddress/' + email.split('.').join('_____dot_____')).remove();
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function register(email, mobile, browser) {

    console.log('STEP: Registration.register', email, mobile);

    browser
        .url('http://localhost:9001')
        .waitForElementVisible('#mobile', WAIT)
        .setValue('#mobile', mobile)
        .waitForElementVisible('#email', WAIT)
        .setValue('#email', email)
        .waitForElementVisible('#password', WAIT)
        .setValue('#password', mobile)
        .waitForElementVisible('#submit', WAIT)
        .click('#submit')
        .waitForElementVisible('#pinput', WAIT)
        .setValue('#pinput', '1234')
        .waitForElementVisible('#submit', WAIT)
        .pause(1000)
        .click('#submit')
        .waitForElementVisible('.title', WAIT)
        .waitForElementVisible('#firstNameInput', WAIT)
        .setValue('#firstNameInput', mobile)
        .waitForElementVisible('#lastNameInput', WAIT)
        .setValue('#lastNameInput', email)
        .waitForElementVisible('#submit', WAIT)
        .click('#submit')
        .waitForElementVisible('#contactsView', WAIT);
}

module.exports = {
    deRegister: deRegister,
    register: register
};