import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    
    propsSorting: [':asc'],
    chartOptions: Ember.computed('selectedModelProperty', function() {
        let options = {
            chart: {
                type: 'pie'
            },
            title: {
                text: this.get('selectedModelProperty')         
            }
        };
        
        return options;
    }),
    
    init() {
        this._super(...arguments);
        this.send('initChart', this.get('selectedModelProperty'));
    },
    
//    sortedModelProps: Ember.computed.sort('modelProps', 'propsSorting'),
//    modelProps: Ember.computed('models.[]', function() {
//        return Object.keys(this.get('models').get('firstObject').toJSON());
//    }),
    normalizedChartData: Ember.computed('chartData', function() {
        let formatedData = {};
        formatedData['name'] = this.get('selectedModelProperty');
        formatedData['colorByPoint'] = true;
        formatedData['data'] = [];

        if (this.get('chartData')) {
            this.get('chartData').forEach(function(item, index) {
                let itemData = {};
                itemData['name'] = item.get('key');
                itemData['y'] = item.get('docCount');
                
                formatedData['data'].push(itemData);
                
            }, this);   
        }

        return [formatedData];
    }),
    
    filterByDateChanged: Ember.observer('filterByDate', function() {
        this.send('initChart', this.get('selectedModelProperty'));
    }),

    actions: {
        initChart: function(value) {
            let params = {};
            let self = this;

            if (value) {
                params['filterByDate'] = this.get('filterByDate');
                params['property'] = Ember.String.underscore(value);
                            
                this.get('store').query('propertyhistogram', params).then(
                    function(data) {
                        self.set('chartData', data);
//                        self.set('selectedModelProperty', value);
                    },reject => {
                        console.log('error');
                     }
                );
            }
        }
    }
});
