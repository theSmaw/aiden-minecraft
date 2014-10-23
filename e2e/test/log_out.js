//'use strict';
//
//var authentication = require('../steps/authentication.step.js'),
//    registration = require('../steps/registration.step.js');
//
//module.exports = {
//
//    before: function(browser, done) {
//        registration.deRegister('one@three.com', '13131313', browser)
//            .then(done);
//    },
//
//    'Log Out' : function (browser) {
//        registration.register('one@three.com', '13131313', browser);
//        authentication.logOut(browser);
//        browser
//            .assert.visible('#mobile')
//            .end();
//    }
//};