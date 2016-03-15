'use strict'

var gulp = require('gulp');

gulp.task('esLint', require('./gulp/linterns/esLint'));
gulp.task('minifyJS', require('./gulp/tasks/minifyJS'));
gulp.task('todo', require('./gulp/tasks/todo'));
gulp.task('jsDoc', require('./gulp/tasks/jsDoc'));
gulp.task('sass', require('./gulp/tasks/sass'));

/*********************WATCHERS*********************/
gulp.task('watch', require('./gulp/watchers'));
/*******************END WATCHERS*******************/