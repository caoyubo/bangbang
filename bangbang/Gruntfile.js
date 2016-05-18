'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      '  */\n',
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
      },

      buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
        options: {
            report: "min"//输出压缩率，可选的值有 false(不输出信息)，gzip
        },
        files: [{
          expand:true,
          cwd:'src',//js目录下
          //src:'**/*.js',//所有js文件
          src:['core/**/*.js','framework/**/*.js','language/**/*.js','routes/**/*.js','views/**/*.js','app.js'],//所有js文件
          dest: 'target'//输出到此目录下
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {

        expressdev: {
          files:  [ 'src/**/*.js' ],
          tasks:  [ 'express:dev' ],
          options: {
            spawn: false,
          }
        },
        expressdev2: {
          files:  [ 'src/**/*.js' ],
          tasks:  [ 'copy' , 'uglify:buildall','express:dev2' ],
          options: {
            spawn: false,
          }
        },
        expressdev3: {
          files:  [ 'src/public/**/*.*'  ],
          options: {
              livereload: true
          }
        }
    },
    copy:{
        statics:{
            expand: true,
            cwd: 'src/public',
            src: '**',
            dest: 'target/public/'
        },
        views:{
          expand: true,
          cwd: 'src/views',
          src: '**',
          dest: 'target/views/'
        },
        datas:{
          expand: true,
          cwd: 'src/data',
          src: '**',
          dest: 'target/data/'
        }
    },
    express:{
      options:{
        //livereload: true
      },
      dev:{
        options:{
          script:"src/app.js"
        }
      },
      dev2:{
        options:{
          script:"target/app.js"
        }
      }
    },
    clean:{
      all: ['conf/', 'sh/' , 'src/' , 'test/'],
    },

  });

  // These plugins provide necessary tasks.
  // Default task.
  grunt.registerTask('default', ['express:dev','watch:expressdev']);
  grunt.registerTask('rundev2', ['express:dev','watch:expressdev3']);
  grunt.registerTask('rundev', ['copy' , 'uglify:buildall' , 'express:dev2','watch:expressdev2']);
  grunt.registerTask('buildtest', ['copy' , 'uglify:buildall','clean:all' ]);


};
