import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    classNameBindings: ['active'],
    active: Ember.computed('params.[]', function() {
        let par = this.get('params');
        if (par[this.get('filter')] == this.get('value')) {
            return true;
        }
        return false;
    }),
    
    actions: {
        filterBy: function(filter, value) {
            this.get('controllerAction')(value);
        }
    }
});