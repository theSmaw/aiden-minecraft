//'use strict';
//
//var authentication = require('../steps/authentication.step.js'),
//    invite = require('../steps/invite.step.js'),
//    registration = require('../steps/registration.step.js'),
//    WAIT = 15000;
//
//module.exports = {
//
//    before: function(browser, done) {
//        registration.deRegister('one@two.com', '12121212', browser)
//            .then(done);
//    },
//
//    'CON-286 - Verification status not updated in ContactDetails for your connection to see' : function (browser) {
//        registration.register('one@two.com', '12121212', browser);
//        invite.inviteNewBySMS('15151515', browser);
//        authentication.logOut(browser);
//        registration.register('one@five.com', '15151515', browser);
//        browser
////            .waitForElementVisible('.icon-feed', WAIT)
////            .pause(1000)
////            .click('.icon-feed')
////            .waitForElementVisible('#feedView', WAIT)
////            .waitForElementVisible('#acceptButton', WAIT)
////            .click('#acceptButton')
////            .waitForElementVisible('popup', WAIT)
////            .waitForElementVisible('.checkbox-profile-business', WAIT)
////            .click('.checkbox-profile-business')
////            .waitForElementVisible('#selectProfile')
////            .click('#selectProfile')
////            .waitForElementNotVisible('.checkbox-profile-business', WAIT)
////            .waitForElementVisible('.icon-contacts', WAIT)
////            .pause(1000)
////            .click('.icon-contacts')
////            .waitForElementVisible('.contact-display-name', WAIT)
////            .click('.contact-display-name')
////            .waitForElementVisible('#contactDetailsView', WAIT)
////            .waitForElementVisible('#mobile1Verified')
//            .assert.visible('#mobile1Verified')
//            .end();
//    }
//};