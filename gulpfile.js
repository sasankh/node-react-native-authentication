'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

var jshint = require('gulp-jshint');

var vconcat = require('gulp-concat-vendor');

var notify = require('gulp-notify');
var concat = require('gulp-concat');

var env = require('gulp-env');

var nodemon = require('gulp-nodemon');

var serverDir = './server';
var testDir = './tests';

var path = {

  SERVER: ['server.js', 'gulpfile.js', serverDir + '/**/*.js', serverDir + '/**/**/*.js', serverDir + '/**/**/**/*.js'],

  TEST: [testDir + '/mocha/*.js', testDir + '/mocha/**/*.js',testDir + '/mocha/**/**/*.js']
};

// linting server files
gulp.task('lint-server', function() {
  return (
    gulp.src(path.SERVER)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
  );
});

// linting test files
gulp.task('lint-test', function() {
  return (
    gulp.src(path.TEST)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
  );
});

// Mocha test Task
gulp.task('mocha', function() {
  return gulp.src(path.TEST, {read: false})
  .pipe(mocha({
    reporter: 'mocha-jenkins-reporter',
    reporterOptions: {
      junit_report_name: 'Application Tests',
      junit_report_path: 'tests/report/report.xml',
      junit_report_stack: '1'
    },
    timeout: 7000
  }))
  .on('error', function(err) {
    gutil.log(err.toString());
    this.emit('end');
  });
});

gulp.task('watch-test', function() {
  gulp.watch(path.TEST, ['mocha']);
});

// Watch task for server
// Watch files for changes
gulp.task('watch', function() {
  gulp.watch([path.SERVER], ['lint']);
});

// Nodemon Tasks
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    tasks: ['lint-server']
  })
  .on('restart', function () {
    gutil.log('Nodemon restarted!');
  });
});

// environment vars for dev
gulp.task('dev-env', function() {
  env({
    vars: {
      APPLICATION : 'node-react-native-authentication',
      PORT : 3000,
      CRYPTOKEY : '2e7659274f7a3d526f226e243a272a524f283d325e7333793d477d3c64',
      ENVIRONMENT : 'development',
			MYSQL_HOST : '---',
			MYSQL_USER : '---',
			MYSQL_PASS : '---',
			MYSQL_DB : '---',
			MYSQL_PORT : '---'
    }
  });
});

// environment vars for test
gulp.task('test-env', function() {
  env({
    vars: {
      APPLICATION : 'node-react-native-authentication',
      PORT : 3000,
      CRYPTOKEY : '2e7659274f7a3d526f226e243a272a524f283d325e7333793d477d3c64',
      ENVIRONMENT : 'test',
			MYSQL_HOST : '---',
			MYSQL_USER : '---',
			MYSQL_PASS : '---',
			MYSQL_DB : '---',
			MYSQL_PORT : '---'
    }
  });
});

gulp.task('lint', ['lint-server', 'lint-test']);
gulp.task('test', ['test-env', 'mocha']);

gulp.task('build', ['lint', 'dev-env']);
gulp.task('start', ['build', 'watch', 'nodemon']);

gulp.task('default', ['start']);
