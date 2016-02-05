'use strict'

//Dependencias
var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    todo = require('gulp-todo'),
    jsdoc = require('gulp-jsdoc-to-markdown'),
    markdownToHTML = require('gulp-markdown');

//Variables auxiliares
var jsToWatch = ['src/*.js', '!src/**/*.min.js'];

//Tarea 'lint'. Lintea solo los archivos HTML.
gulp.task('lint', function() {
  return gulp.src(jsToWatch)
  .pipe(eslint())
  .pipe(eslint.format());
});
/*Tarea 'minificarJS'. Concat evita la compresión
  de la fuente y/o el problema del bucle infinito.*/
gulp.task('minificarJS', ['lint'], function () {
  return gulp.src(jsToWatch)
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src'));
});
//Tarea 'todo'. Lista los todo en un archivo HTML.
gulp.task('todo', ['minificarJS'], function() {
  return gulp.src(jsToWatch)
    .pipe(todo())
    .pipe(markdownToHTML())
    .pipe(gulp.dest('./docs/'));
});
//Tarea 'jsDoc'. Crea una documentacion HTML de todas las funciones.
gulp.task('jsDoc', ['minificarJS'], function() {
  return gulp.src(jsToWatch)
    .pipe(concat('jsdoc.md'))
    .pipe(jsdoc())
    .pipe(markdownToHTML())
    .pipe(gulp.dest('./docs/'));
});

//Vigilante, al hacerlo como una tarea, no ejecuta nada por defecto al abrir.
gulp.task('watch', function() {
  gulp.watch(jsToWatch, ['minificarJS', 'jsDoc', 'todo']).on('end', function(){
    console.log('-------Compilation successful-------');
  });
});