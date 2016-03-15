'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var jsdoc = require('gulp-jsdoc-to-markdown');
var markdownToHTML = require('gulp-markdown');
var utils = require('../utils');

module.exports = function() {
  return gulp.src(utils.src.js)
    .pipe(concat('jsdoc.md'))
    .pipe(jsdoc())
    .pipe(markdownToHTML())
    .pipe(gulp.dest(utils.dest.docs));
};