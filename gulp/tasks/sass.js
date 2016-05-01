'use strict'
let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let utils = require('../utils');

module.exports = () => {
  return gulp.src(utils.src.scss)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(utils.dest.css));
};