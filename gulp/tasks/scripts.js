'use strict'
let gulp = require('gulp');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let utils = require('../utils');

module.exports = () => {
  return gulp.src(utils.src.js)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(utils.dest.js))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify())
    .pipe(gulp.dest(utils.dest.js));
};