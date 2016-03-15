'use strict'

var gulp = require('gulp');
var jsonLint = require('gulp-jsonlint');
var utils = require('../utils');

//Tarea 'lint'. Lintea solo los archivos HTML.
module.exports = function() {
  return gulp.src(utils.src.json)
    .pipe(jsonLint())
    .pipe(jsonLint.reporter())
    .pipe(jsonLint.failOnError());
};