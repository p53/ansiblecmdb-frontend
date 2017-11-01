import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('hosts');
    this.route('items');
    this.route('login');
    this.route('host', { path: '/host/:host_id' });
});

export default Router;
