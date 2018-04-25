import Ember from 'ember';
import Host from '../models/host';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    error: null,
    password: null,
    repeatPassword: null,
    validatePassword: function() {
        if (this.get('password') != this.get('repeatPassword')) {
            this.set('error', 'Password is not same!');
            return false;
        }
        return true;
    },
    actions: {
        updateUser: function() {
            let updatedUser = this.get('user');
            
            if (this.validatePassword()) {
                updatedUser.set('password', this.get('password'));
                updatedUser.save();
                this.set('error', null);
            }
        }
    }
});