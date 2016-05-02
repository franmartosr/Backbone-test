'use strict'
const jsPaths = [
  'src/js/models.js', 'src/js/collections.js', 'src/js/views.js',
  'src/js/!(init)*.js', 'src/js/init.js'
];

module.exports = {
  src: {
    js: jsPaths,
    json: ['package.json', 'src/json/*.json'],
    scss: ['src/scss/**/*.scss']
  },
  dest: {
    css: './dist/css',
    docs: './dist/docs',
    js: './dist/js'
  }
};