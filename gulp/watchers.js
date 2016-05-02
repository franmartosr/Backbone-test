'use strict'
let gulp = require('gulp');
let runSequence = require('run-sequence');
let utils = require('./utils');
const watchProps = {
  interval: 1000,
  debounceDelay: 2000
};

module.exports = () => {
  gulp.watch(utils.src.js, watchProps, (file) => {
    return runSequence('esLint', 'scripts', 'jsDoc', 'todo');
  });
  gulp.watch(utils.src.json, watchProps, ['jsonLint']);
  gulp.watch(utils.src.scss, watchProps, ['sass']);
};