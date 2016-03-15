'use strict'

var gulp = require('gulp');
var runSequence = require('run-sequence');
var utils = require('./utils');
var watchProps = {
  interval: 1000,
  debounceDelay: 2000
};

//Vigilante, al hacerlo como una tarea, no ejecuta nada por defecto al abrir.
module.exports = function() {
  gulp.watch(utils.src.js, watchProps, function(file) {
    return runSequence('esLint', 'minificarJS', 'jsDoc', 'todo');
  });
  gulp.watch(utils.src.scss, watchProps, ['sass']);
};