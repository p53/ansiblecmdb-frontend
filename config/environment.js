/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
      modulePrefix: 'ansiblecmdb-frontend',
      environment: environment,
      rootURL: '/',
      locationType: 'auto',
      EmberENV: {
        FEATURES: {
          // Here you can enable experimental features on an ember canary build
          // e.g. 'with-controller': true
        }
      },

      APP: {
        API_NAMESPACE: 'api/v1',
        API_HOST: 'http://www.indash.org',
        API_TOKEN_URL: 'http://www.indash.org/api/v1/token'
      }
    };

    ENV['ember-simple-auth'] = {
        store: 'simple-auth-session-store:local-storage',
        authorizer: 'authorizer:simple',
        routeAfterAuthentication: 'hosts',
        authenticationRoute: 'login'
    };
    
    if (environment === 'development') {
      // ENV.APP.LOG_RESOLVER = true;
      // ENV.APP.LOG_ACTIVE_GENERATION = true;
      // ENV.APP.LOG_TRANSITIONS = true;
      // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
      // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
      // Testem prefers this...
      ENV.locationType = 'none';

      // keep test console output quieter
      ENV.APP.LOG_ACTIVE_GENERATION = false;
      ENV.APP.LOG_VIEW_LOOKUPS = false;

      ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
