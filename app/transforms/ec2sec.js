import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(value) {
    return value ? value.join(',') : '';
  },
  deserialize: function(value) {
    return value ? value.split(',') : [];
  }
});



