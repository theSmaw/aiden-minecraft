module.exports = function(grunt) {

    grunt.initConfig({
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: {
                src: ['test/*.js']
            }
        },
        watch: {
            scripts: {
                files: ['gruntfile.js', 'test/**/*.js'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.registerTask('default', 'simplemocha');
    grunt.registerTask('test', 'watch')
};