import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    queryParams: {
        filterByTerm: {
            refreshModel: true
        }
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
