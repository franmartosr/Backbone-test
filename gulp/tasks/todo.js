'use strict'

//Dependencias
var gulp = require('gulp');
var todo = require('gulp-todo');
var markdownToHTML = require('gulp-markdown');
var utils = require('../utils');

module.exports = function() {
  return gulp.src(utils.src.js)
    .pipe(todo())
    .pipe(markdownToHTML())
    .pipe(gulp.dest(utils.dest.docs));
};