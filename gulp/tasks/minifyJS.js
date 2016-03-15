'use strict'

//Dependencias
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utils = require('../utils');

module.exports = function () {
  return gulp.src(utils.src.js)
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(utils.dest.src));
};