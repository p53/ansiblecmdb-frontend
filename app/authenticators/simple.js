import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

export default Base.extend({
    tokenEndpoint: config.APP.API_TOKEN_URL,
    
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.token)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },

    authenticate: function(options) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                url: this.tokenEndpoint,
                type: 'POST',
                dataType: 'json',
                data: {
                    username: options.username,
                    password: options.password
                }
            }).then(function(response) {
                Ember.run(function() {
                    resolve({
                        token: response['token']
                    });
                });
            }, function(xhr, status, error) {
                var response = xhr.responseText;
                Ember.run(function() {
                    reject(response);
                });
            });
        });
    },

    invalidate: function() {
        return Ember.RSVP.resolve();
    }
});