module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     concat: {
      srcs: {
          src: ['./src/main.js','src/*/**.js','!src/main.test.js','!src/*/**.test.js'],
          dest: './dist/min.js',
      },
      tests: {
          src: ['src/main.test.js','src/*/**.test.js'],
          dest: './tests/.tmp/main.js',
      },
      withJquery: {
        src: ['bower_components/jquery/dist/jquery.min.js','dist/min.js'],
        dest: 'dist/jquery-min.js',
      },
    },
    watch: {
      scripts: {
        files: ['src/**/*.js','src/*.js'],
        tasks: ['build'],
        options: {
          interrupt: true,
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('build', ['concat']);

};