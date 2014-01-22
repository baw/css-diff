/*global module */

module.exports = function (grunt) {

    //Project configuration
    grunt.initConfig({
        "jshint": {
            "files": {
                "src": ["src/*.js"]
            }
        },
        "concat": {
            dist: {
                src: ['src/*.js'],
                dest: 'build/build.js'
            }
        },
        "qunit": {
            files: ['test/qunit/tests.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', ['jshint', 'concat', 'qunit']);
};