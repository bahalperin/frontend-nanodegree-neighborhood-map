'use strict'

module.exports = function (grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: ['js/knockout.min.js', 'build/app.min.js'],
        dest: 'build/combined.min.js'
      }
    },
    cssmin: {
      css: {
        files: {
          'build/style.min.css': ['css/style.css']
        }
      }
    },
    uglify: {
      js: {
        files: {
          'build/app.min.js': ['js/app.js']
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', '> 1%']
      },
      no_dest: {
        src: 'build/style.min.css'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Register default tasks
  grunt.registerTask('default', ['newer:uglify:js', 'newer:concat', 'newer:cssmin', 'newer:autoprefixer']);
}