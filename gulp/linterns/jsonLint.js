'use strict'
let gulp = require('gulp');
let jsonLint = require('gulp-jsonlint');
let utils = require('../utils');

module.exports = () => {
  return gulp.src(utils.src.json)
    .pipe(jsonLint())
    .pipe(jsonLint.reporter())
    .pipe(jsonLint.failOnError());
};