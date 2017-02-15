import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
    authorize: function(data, block) {
        var accessToken = this.get('session.data.authenticated.token');
        if (this.get('session').isAuthenticated && !Ember.isEmpty(accessToken)) {
            block('X-AUTH-TOKEN', accessToken);
        }
    }
});