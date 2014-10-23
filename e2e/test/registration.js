'use strict';

var registration = require('../steps/registration.step.js');

module.exports = {

    before: function(browser, done) {
        registration.deRegister('one@one.com', '11111111', browser)
            .then(done);
    },

    'Registration' : function (browser) {
        registration.register('one@one.com', '11111111', browser);
        browser.assert.visible('#contactsView')
            .end();
    }
};