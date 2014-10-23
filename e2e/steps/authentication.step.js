var q = require('q'),
    WAIT = 15000;

function logIn(email, password, browser) {
    var deferred = q.defer();

    console.log('STEP: Authentication.logIn');

    browser
        .waitForElementVisible('#logIn', WAIT)
        .pause(1000)
        .click('#logIn')
        .waitForElementVisible('#email', WAIT)
        .setValue('#email', email)
        .waitForElementVisible('#password', WAIT)
        .setValue('#password', password)
        .waitForElementVisible('#logIn', WAIT)
        .click('#logIn')
        .waitForElementVisible('#contactsView', WAIT);
    deferred.resolve(browser);
    return deferred.promise;
}

function logOut(browser) {
    var deferred = q.defer();

    console.log('STEP: Authentication.logOut');

    browser
        .waitForElementVisible('.icon-settings', WAIT)
        .pause(1000)
        .click('.icon-settings')
        .waitForElementVisible('.ion-log-out', WAIT)
        .pause(1000)
        .click('.ion-log-out')
        .waitForElementVisible('#mobile', WAIT);
    deferred.resolve(browser);
    return deferred.promise;
}

module.exports = {
    logIn: logIn,
    logOut: logOut
};