'use strict'

//Dependencias
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var todo = require('gulp-todo');
var jsdoc = require('gulp-jsdoc-to-markdown');
var markdownToHTML = require('gulp-markdown');
var runSequence = require('run-sequence');

//Variables auxiliares
var jsToWatch = ['src/*.js', '!src/**/*.min.js'];

//Tarea 'lint'. Lintea solo los archivos HTML.
gulp.task('esLint', function() {
  return gulp.src(jsToWatch)
    .pipe(eslint())
    .pipe(eslint.format());
});
/*Tarea 'minificarJS'. Concat evita la compresión
  de la fuente y/o el problema del bucle infinito.*/
gulp.task('minificarJS', function () {
  return gulp.src(jsToWatch)
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src'));
});
//Tarea 'todo'. Lista los todo en un archivo HTML.
gulp.task('todo', function() {
  return gulp.src(jsToWatch)
    .pipe(todo())
    .pipe(markdownToHTML())
    .pipe(gulp.dest('./docs/'));
});
//Tarea 'jsDoc'. Crea una documentacion HTML de todas las funciones.
gulp.task('jsDoc', function() {
  return gulp.src(jsToWatch)
    .pipe(concat('jsdoc.md'))
    .pipe(jsdoc())
    .pipe(markdownToHTML())
    .pipe(gulp.dest('./docs/'));
});
//Tarea 'styles'. Compila los archivos SASS a CSS.
gulp.task('styles', function () {
  gulp.src('./css/scss/**/*.scss')
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./css/'));
});

/*********************WATCHERS*********************/
gulp.task('watch', require('./gulp/watchers'));
/*******************END WATCHERS*******************/