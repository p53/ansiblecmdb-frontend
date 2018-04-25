import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr(),
    roles: DS.attr(),
    settings: DS.attr(),
    password: DS.attr()
});
