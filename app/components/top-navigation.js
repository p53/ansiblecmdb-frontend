import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        logout: function(params) {
            this.get('session').invalidate().catch((message) => {
                this.set('errorMessage', message);
            });
        }
    }    
});