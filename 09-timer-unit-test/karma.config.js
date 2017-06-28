//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '.',

    files: [
      '../lib/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      '*.js',
      'unittest/**/*.js'
    ],

    // coverage reporter generates the coverage
    reporters: ['coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      './*.js': ['coverage']
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage',
    ],

  });
};