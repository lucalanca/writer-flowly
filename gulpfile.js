'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var _ = require('lodash');
var wrench = require('wrench');

var options = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});



var taskListing = require('gulp-task-listing');
gulp.task('help', taskListing);


var ghPages = require('gulp-gh-pages');
gulp.task('deploy', function() {
  return gulp
    .src('./dist/**/*')
    .pipe(
      ghPages({ branch: 'gh-pages' })
    );
});
