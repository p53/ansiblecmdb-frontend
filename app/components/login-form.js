import Ember from 'ember';

export default Ember.Component.extend({
    authenticator: 'authenticator:simple',
    session: Ember.inject.service(),
    
    actions: {
        authenticate: function() {
            var credentials = this.getProperties('username', 'password');
            
            this.get('session').authenticate('authenticator:simple', credentials).catch((message) => {
                this.set('errorMessage', message);
            });
        }
    }
});