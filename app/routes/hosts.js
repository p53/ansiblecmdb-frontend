import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    user: Ember.inject.service('current-user'),
    queryParams: {
        filterByDate: {
            refreshModel: true
        },
        filterByTerm: {
            refreshModel: true
        },
        static: {
            refreshModel: true
        }
    },
    setupController: function(controller, model){
        this._super(controller, model);
        let userService = this.get('user');
        let hostFields = this.get('user').get('user').get('settings')['host_fields'];
        let graphFields = this.get('user').get('user').get('settings')['graph_fields'];

        if (!hostFields.length) {
            hostFields = ["ansibleHostname", "ansibleOsFamily", "ansibleSystem"];
        }
        
        if (!graphFields.length) {
            graphFields = ["ansibleHostname", "ansibleOsFamily", "ansibleSystem", "ansibleDistribution"];
        }
        
        controller.set('selectedFields', hostFields);
        controller.set('graphFields', graphFields);
    },
    model(params) {
        let parameters = {};
 
        if (params.filterByDate) {
            parameters['filterByDate'] = params.filterByDate;
        }
        
        if (params.filterByTerm) {
            parameters['filterByTerm'] = params.filterByTerm;
        }
        
        if (params.static) {
            parameters['static'] = params.static;
        }
        
        return Ember.RSVP.hash({
            hosts: this.get('store').query('host', parameters),
            dates: this.get('store').query('datehistogram', {})
        });
    },
    actions: {
        loading(transition, originRoute) {
          let controller = this.controllerFor('hosts');
          controller.set('loading', true);
          
          transition.promise.finally(function() {
              controller.set('loading', false);
          });
        }
    }    
});
