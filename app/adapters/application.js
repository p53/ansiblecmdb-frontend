import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:simple',    
    namespace: config.APP.API_NAMESPACE,
    host: config.APP.API_HOST,
    ajax: function(url, method, hash) {
        if (hash === undefined) { hash = {}; }
        hash.crossDomain = true;
        hash.xhrFields = {withCredentials: true};
        return this._super(url, method, hash);
    },
    urlForQueryRecord(query) {
      if (query.me) {
        delete query.me;
        return `${this._super(...arguments)}/me`;
      }

      return this._super(...arguments);
    }
});


