import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    classNameBindings: ['active'],    
    active: Ember.computed('currentValue', function() {
        if (this.get('currentValue') === this.get('value')) {
            return true;
        }
        return false;
    })
});