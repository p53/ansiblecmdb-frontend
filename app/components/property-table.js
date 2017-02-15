import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ec2','col-sm-2', 'col-md-9 ec2'],
    init() {
        this._super(...arguments);
        this.send('sortBy', this.get('sortField'), this.get('defaultSortDef'));
    },        
    sortedData: Ember.computed('data', 'defaultSortDef', 'sortField', function(){
        let localData = [];

        let sortedKeys = Object.getOwnPropertyNames(this.get('data')).sort();
  
        if (this.get('sortField') == 'val') {
            let sortedValues = Object.values(this.get('data')).sort();
            
            this.get('isAscending') ? sortedValues : sortedValues.reverse();
            
            for (var i = 0; i < sortedValues.length; i++) {
                for (var j = 0; j < sortedKeys.length; j++) {
                    if (this.get('data')[sortedKeys[j]] == sortedValues[i]) {
                        let localObj = {};
                        localObj['key'] = sortedKeys[j];
                        localObj['val'] = sortedValues[i];
                        localData.push(localObj);
                    }
                }
            }
        } else {
            this.get('isAscending') ? sortedKeys : sortedKeys.reverse();
            
            for (var j = 0; j < sortedKeys.length; j++) {
                let value = this.get('data')[sortedKeys[j]];
                let localObj = {};
                localObj['key'] = sortedKeys[j];
                localObj['val'] = value;
                localData.push(localObj);
            }
        }

        return localData;
    }),    
    defaultSortDef: 'asc',
    isAscending: false,
    sortField: 'props',
    actions: {
        sortBy: function(field, order) {
            let localField = field == 'props' ? 'props' : 'val';
            let localOrder = order == 'asc' ? 'asc' : 'desc';
            let localAscending = order == 'asc' ? true : false;

            this.set('isAscending', localAscending);
            this.set('sortField', localField);
            this.set('defaultSortDef', localOrder);
        }
    }
})