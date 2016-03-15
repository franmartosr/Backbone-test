'use strict'

//Dependencias
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var todo = require('gulp-todo');
var jsdoc = require('gulp-jsdoc-to-markdown');
var markdownToHTML = require('gulp-markdown');

var utils = require('./gulp/utils');

gulp.task('esLint', require('./gulp/linterns/esLint'));
gulp.task('minifyJS', require('./gulp/tasks/minifyJS'));
//Tarea 'todo'. Lista los todo en un archivo HTML.
gulp.task('todo', function() {
  return gulp.src(utils.src.js)
    .pipe(todo())
    .pipe(markdownToHTML())
    .pipe(gulp.dest(utils.dest.docs));
});
//Tarea 'jsDoc'. Crea una documentacion HTML de todas las funciones.
gulp.task('jsDoc', function() {
  return gulp.src(utils.src.js)
    .pipe(concat('jsdoc.md'))
    .pipe(jsdoc())
    .pipe(markdownToHTML())
    .pipe(gulp.dest(utils.dest.docs));
});
gulp.task('sass', require('./gulp/tasks/sass'));

/*********************WATCHERS*********************/
gulp.task('watch', require('./gulp/watchers'));
/*******************END WATCHERS*******************/