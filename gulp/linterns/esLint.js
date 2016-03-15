'use strict'

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jsToWatch = ['src/*.js', '!src/**/*.min.js'];

//Tarea 'lint'. Lintea solo los archivos HTML.
module.exports = function() {
  return gulp.src(jsToWatch)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};