import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    currentUser: Ember.inject.service('current-user'),
    actions: {
        invalidateSession: function() {
            this.get('session').invalidate();
        }
    },
    beforeModel() {
        return this._loadCurrentUser();
    },
    sessionAuthenticated() {
        this._super(...arguments);
        this._loadCurrentUser();
    },
    _loadCurrentUser() {
        return this.get('currentUser').load().catch((err) => {console.log(err);this.get('session').invalidate();});
    }
});