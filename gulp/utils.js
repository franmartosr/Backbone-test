'use strict'

module.exports = {
  src: {
    js: ['src/js/*.js'],
    json: ['package.json'],
    scss: ['src/scss/**/*.scss']
  },
  dest: {
    css: './dist/css',
    docs: './dist/docs',
    src: './dist/js'
  }
};