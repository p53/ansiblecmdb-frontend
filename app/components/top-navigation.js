import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service('store'),
    currentUser: Ember.inject.service('current-user'),
    actions: {
        logout: function(params) {
            this.get('session').invalidate().catch((message) => {
                this.set('errorMessage', message);
            });
        }
    }    
});