'use strict'

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var utils = require('../utils');

//Tarea 'lint'. Lintea solo los archivos HTML.
module.exports = function() {
  return gulp.src(utils.src.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};