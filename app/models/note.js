import DS from 'ember-data';

export default DS.Model.extend({
    hosts: DS.hasMany('host'),
    note: DS.attr(),
    ansible_machine_id: DS.attr(),
    ansible_product_uuid: DS.attr()
});
