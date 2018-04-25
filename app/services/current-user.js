import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    load() {
        if (this.get('session.isAuthenticated')) {
            return this.get('store').queryRecord('user', { me: true }).then((user) => {
                this.set('user', user);
            });
        } else {
            return RSVP.resolve();
        }
    }
});