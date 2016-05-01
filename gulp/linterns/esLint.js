'use strict'
let gulp = require('gulp');
let eslint = require('gulp-eslint');
let utils = require('../utils');

module.exports = () => {
  return gulp.src(utils.src.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};