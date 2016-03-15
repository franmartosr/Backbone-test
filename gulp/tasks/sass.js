'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var utils = require('../utils');

module.exports = function() {
  return gulp.src(utils.src.scss)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(utils.dest.css));
};