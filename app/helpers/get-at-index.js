import Ember from 'ember';

export default Ember.Helper.extend({
  recomputeOnArrayChange: Ember.observer('_array.[]', function() {
  	this.recompute();  
  }),
  
  compute: function([array, index]) {
		this.set('_array', array);
    
		return array.get(index);
  }
});
