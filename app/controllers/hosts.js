import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: [
        'page',
        'pageSize',
        'sortField',
        'sortOrder',
        'filterByDate',
        'filterByTerm',
        'static'
    ],
    filterByDate: "",
    filterByTerm: "",
    page: 1,
    pageSize: 10,
    pagerView: 4,
    sortField: "",
    sortOrder: 'asc',
    static: false,
    chartData: [],
    loading: false,
    actions: {
        dateInit: function(sortedDates) {
            if (!this.get('filterByDate') && !this.get('static')) {
                let params = {
                    filterByDate: sortedDates.get('firstObject').get('key'),
                    page: this.get('page'),
                    pageSize: this.get('pageSize'),
                    pagerView: this.get('pagerView'),
                };

                this.transitionToRoute('hosts', { queryParams: params});
            }
        },
        
        filterByDate: function(value) {
            if (value) {
                let params = {
                    filterByDate: value,
                    page: 1,
                    pageSize: this.get('pageSize')
                };
                
                this.transitionToRoute('hosts', { queryParams: params});
            }
        },
        
        filterByTerm: function(value) {
            let params = {
                filterByDate: this.get('filterByDate'),
                page: 1,
                pageSize: this.get('pageSize')
            };

            if (value) {
                params['filterByTerm'] = value;
            } else {
                params['filterByTerm'] = "";
            }
            
            this.transitionToRoute('hosts', { queryParams: params});
        },
        getDetail: function(value) {
            this.transitionToRoute('host', value);
        }
    }
});    


