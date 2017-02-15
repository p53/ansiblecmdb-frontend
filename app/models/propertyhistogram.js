import DS from 'ember-data';

export default DS.Model.extend({
    keyAsString : DS.attr(),
    key: DS.attr(),
    docCount: DS.attr()
});
