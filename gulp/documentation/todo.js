'use strict'
let gulp = require('gulp');
let todo = require('gulp-todo');
let markdownToHTML = require('gulp-markdown');
let utils = require('../utils');

module.exports = () => {
  return gulp.src(utils.src.js)
    .pipe(todo())
    .pipe(markdownToHTML())
    .pipe(gulp.dest(utils.dest.docs));
};