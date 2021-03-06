'use strict';

var authentication = require('../steps/authentication.step.js'),
    invite = require('../steps/invite.step.js'),
    registration = require('../steps/registration.step.js'),
    WAIT = 15000;

module.exports = {

    before: function(browser, done) {

        registration.deRegister('one@two.com', '12121212', browser)
            .then(function() {
                registration.deRegister('one@five.com', '15151515', browser)
                    .then(done);
            });
    },

    'CON-286 - Verification status not updated in ContactDetails for your connection to see' : function (browser) {
        registration.register('one@two.com', '12121212', browser);
        invite.inviteNewBySMS('15151515', browser);
        authentication.logOut(browser);
        registration.register('one@five.com', '15151515', browser);
        browser
            .waitForElementVisible('.icon-feed', WAIT)
            .pause(1000)
            .click('.icon-feed')
            .waitForElementVisible('#feedView', WAIT)
            .waitForElementVisible('button.first', WAIT)
            .pause(1000)
            .click('button.first')
            .waitForElementVisible('.checkbox-profile-business', WAIT)
            .click('.checkbox-profile-business')
            .waitForElementVisible('#selectProfile', WAIT)
            .click('#selectProfile')
            .waitForElementNotVisible('.checkbox-profile-business', WAIT)
            .waitForElementVisible('.icon-contacts', WAIT)
            .pause(1000)
            .click('.icon-contacts')
            .waitForElementPresent('.is-connectid', WAIT)
            .pause(1000)
            .click('.is-connectid')
            .waitForElementVisible('#contactDetailsView', WAIT)
            .waitForElementVisible('#mobile1Verified', WAIT)
            .assert.visible('#mobile1Verified')
            .end();
    }
};