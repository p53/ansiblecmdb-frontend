import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
    },
    activate () {
      Ember.$('body').addClass('app-login');
    },

    deactivate () {
      Ember.$('body').removeClass('app-login');
    }
});