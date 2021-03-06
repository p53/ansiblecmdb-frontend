import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    user: Ember.inject.service('current-user'),
    queryParams: {
        filterByTerm: {
            refreshModel: true
        }
    },
    setupController: function(controller, model){
        this._super(controller, model);
        let userService = this.get('user');
        let itemFields = this.get('user').get('user').get('settings')['item_fields'];
        
        if (typeof itemFields == "undefined") {
            itemFields = ["ansibleHostname", "ansibleOsFamily", "ansibleSystem"];
        }
        
        if (!itemFields.length) {
            itemFields = ["ansibleHostname", "ansibleOsFamily", "ansibleSystem"];
        }
        
        controller.set('selectedFields', itemFields);
    },
    model(params) {
        let parameters = {};
        
        
        if (params.filterByTerm) {
            parameters['filterByTerm'] = params.filterByTerm;
        }
        
        return Ember.RSVP.hash({
            hosts: this.get('store').query('item', parameters)
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
