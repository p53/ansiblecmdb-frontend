import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: [
        'page',
        'pageSize',
        'sortField',
        'sortOrder',
        'filterByTerm'
    ],
    filterByTerm: "",
    page: 1,
    pageSize: 10,
    pagerView: 4,
    sortField: "",
    sortOrder: 'asc',
    chartData: [],
    loading: false,
    actions: {
        filterByTerm: function(value) {
            let params = {
                page: 1,
                pageSize: this.get('pageSize')
            };

            if (value) {
                params['filterByTerm'] = value;
            } else {
                params['filterByTerm'] = "";
            }
            
            this.transitionToRoute('items', { queryParams: params});
        },
        getDetail: function(value) {
            this.transitionToRoute('item', value);
        }
    }
});    


