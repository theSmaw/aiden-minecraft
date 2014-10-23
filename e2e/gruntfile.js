'use strict';

// If Selenium gets stuck open, kill it in a browser with http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-nightwatch');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.initConfig({
        gitclone: {
            client: {
                options: {
                    directory: 'tempClient',
                    repository: 'git@github.com:connectid/connectid-client.git'
                }
            }
        },
        nightwatch: {
            options: {}
        },
        clean: ['tempClient'],
        'string-replace': {
            src: ['tempClient/**/*'],
            dest: '.tmp/',
            options: {
                replacements: [
                    {
                        pattern: /fireb.const.rep.str/g,
                        replacement: 'https://connectid-qa.firebaseio.com'
                    },
                    {
                        pattern: /connectidpreview/g,
                        replacement: 'connectid-qa'
                    }
                ]
            }
        }
    });

    grunt.registerTask('e2e', [
        'clean',
     //   'gitclone:client',

        // string replace not working
        'string-replace',

        // grunt server
        'nightwatch',

        'clean'

        // run on ci box

        // run on ci box on certain triggers

        // pre-deploy on hipchat
    ]);
};
