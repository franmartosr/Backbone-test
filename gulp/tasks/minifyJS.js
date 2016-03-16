'use strict'

//Dependencias
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var utils = require('../utils');

module.exports = function () {
  return gulp.src(utils.src.js)
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify())
    .pipe(gulp.dest(utils.dest.src));
};