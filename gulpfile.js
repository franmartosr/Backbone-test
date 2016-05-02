'use strict'
let gulp = require('gulp');

/**********************LINTERNS*********************/
gulp.task('esLint', require('./gulp/linterns/esLint'));
gulp.task('jsonLint', require('./gulp/linterns/jsonLint'));
/********************END LINTERNS*******************/

/***********************TASKS***********************/
gulp.task('scripts', require('./gulp/tasks/scripts'));
gulp.task('sass', require('./gulp/tasks/sass'));
/*********************END TASKS*********************/

/*******************DOCUMENTATION******************/
gulp.task('jsDoc', require('./gulp/documentation/jsDoc'));
gulp.task('todo', require('./gulp/documentation/todo'));
/*****************END DOCUMENTATION****************/

/*********************WATCHERS*********************/
gulp.task('watch', require('./gulp/watchers'));
/*******************END WATCHERS*******************/