/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    minifyJS: {
      enabled: false
    },
    minifyCSS: {
      enabled: false
    },
    sassOptions: {
        includePaths: [
          'node_modules/spinkit/scss',
          'node_modules/spinkit/scss/spinners',
          'bower_components/bootstrap-sass/assets/stylesheets'
        ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js');
  app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff', {
    destDir: '/fonts/bootstrap'
  });

  app.import('vendor/holder.js');
  app.import('vendor/ie-emulation-modes-warning.js');
  app.import('vendor/ie10-viewport-bug-workaround.js');
  
  return app.toTree();
};
