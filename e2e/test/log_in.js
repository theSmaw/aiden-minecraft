//'use strict';
//
//var authentication = require('../steps/authentication.step.js'),
//    registration = require('../steps/registration.step.js');
//
//module.exports = {
//
//    before: function(browser, done) {
//        registration.deRegister('one@four.com', '14141414', browser)
//            .then(done);
//    },
//
//    'Log In' : function (browser) {
//        registration.register('one@four.com', '14141414', browser);
//        authentication.logOut(browser);
//        authentication.logIn('one@four.com', '14141414', browser);
//        browser.assert.visible('#contactsView')
//            .end();
//    }
//};