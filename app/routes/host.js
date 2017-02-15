import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(params) {
        let parameters = {};
        let hostId = params.host_id;
        
        return Ember.RSVP.hash({
            host: this.get('store').findRecord('host', hostId)
        });
    }
});
