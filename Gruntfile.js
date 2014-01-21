module.exports = function (grunt) {
    
    //Project configuration
    grunt.initConfig({
        "jshint" : {
            "files": {
                "src": ["src/*.js"]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('test', ['jshint']);
};