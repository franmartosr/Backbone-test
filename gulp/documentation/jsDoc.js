'use strict'
let gulp = require('gulp');
let concat = require('gulp-concat');
let jsdoc = require('gulp-jsdoc-to-markdown');
let markdownToHTML = require('gulp-markdown');
let utils = require('../utils');

module.exports = () => {
  return gulp.src(utils.src.js)
    .pipe(concat('jsdoc.md'))
    .pipe(jsdoc())
    .pipe(markdownToHTML())
    .pipe(gulp.dest(utils.dest.docs));
};