import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'th',
    classNameBindings: ['active'],    
    active: Ember.computed('currentValue', 'value', function() {
        return this.get('currentValue') === this.get('value') ? true : false;
    }),
    isAscending: Ember.computed('sortOrder', function() {
        return this.get('sortOrder') === 'asc' ? true : false;
    }),
    linkSortOrder: Ember.computed('sortOrder', function() {
        return this.get('sortOrder') === 'asc' ? 'desc' : 'asc';
    })
});