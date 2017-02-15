import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
    primaryKey: '_id',
    keyForAttribute: function(attr) {
        return Ember.String.underscore(attr);
    }
});