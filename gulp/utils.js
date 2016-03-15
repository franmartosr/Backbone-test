'use strict'

module.exports = {
  src: {
    js: ['src/*.js', '!src/**/*.min.js'],
    json: ['package.json'],
    scss: ['css/scss/**/*.scss']
  },
  dest: {
    css: './css',
    docs: './docs',
    src: './src'
  }
};