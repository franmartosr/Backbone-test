'use strict'
let gulp = require('gulp');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let utils = require('../utils');

module.exports = () => {
  return gulp.src(utils.src.js)
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify())
    .pipe(gulp.dest(utils.dest.src));
};