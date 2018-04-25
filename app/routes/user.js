import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model(params) {
        let parameters = {};
        let userId = params.user_id;
        
        return Ember.RSVP.hash({
            user: this.get('store').findRecord('user', userId, {reload: true})
        });
    } 
});
