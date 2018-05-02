import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    pageSizeRange: [5,10,20,50,100],
    selectedFields: [],
    fields: [],
    searchedHost: "",
    
    init() {
        this._super(...arguments);
        this.get('initRouteAction')();
    },
    
    emptyTableRowArray: Ember.computed('pageSize', 'filteredModels', function(){
        let emptyRows = this.get('pageSize') - this.get('filteredModels').length;
        return [...Array(emptyRows).keys()];
    }),
    
    numPages:  Ember.computed('data.[]', 'pageSize', function() {
        let modulo = this.get('data').get('length') % this.get('pageSize');
        let pages = 0;

        if (modulo) {
            pages = Math.floor((this.get('data').get('length') / this.get('pageSize'))) + 1;
        } else {
            pages = (this.get('data').get('length') / this.get('pageSize'));
        }
        
        return pages;
    }),
    
    numPagesArray: Ember.computed('page', 'numPages', 'pagerView', function() {
        let paddingPages = Math.floor((this.get('pagerView') - 1) / 2);
        let firstPage = this.get('page') - paddingPages;
        let lastPage = this.get('page') + paddingPages;
        
        if (this.get('page') > this.get('numPages')) {
            lastPage = this.get('numPages');
            firstPage = lastPage - this.get('pagerView');
        }
            
        if (lastPage > this.get('numPages')) {
            let overflow = lastPage - this.get('numPages');
            firstPage = firstPage - overflow;
            
            if (!this.get('pagerView') % 2) {
                firstPage -= 1;
            }
        }
        
        firstPage -= 1;
                
        if (firstPage < 1) {
            firstPage = 1;
        }

        let pagerViewNum = this.get('pagerView');
        
        if(pagerViewNum > this.get('numPages')) {
            pagerViewNum = this.get('numPages');
        }
        
        return [...Array(pagerViewNum).keys()].map(function(num) { return num + firstPage; });
    }),
    
    filteredModels: Ember.computed('data.[]', 'pageSize', 'page', 'sortField', 'sortOrder', 'selectedFields.[]', function() {
        let start = this.get('page')*this.get('pageSize')-this.get('pageSize');
        let end = this.get('page')*this.get('pageSize');
        let result;
        let defaultSortField = '';
        
        if (this.get('sortField')) {
            defaultSortField = this.get('sortField');
        } else {
            defaultSortField = this.get('selectedFields')[0];
        }

        if (this.get('sortOrder') === 'asc') {
            result = this.get('data').sortBy(defaultSortField).slice(start, end);
        } else if (this.get('sortOrder') === 'desc') {
            result = this.get('data').sortBy(defaultSortField).reverse().slice(start, end);
        } 

        return result;
    }),
    
    queryParams: Ember.computed('pageSize', 'page', 'sortField', 'sortOrder', function() {
        let params = {};
        params = {
            'pageSize': this.get('pageSize'),
            'page': this.get('page'),
            'sortField': this.get('sortField'),
            'sortOrder': this.get('sortOrder')
        };

        return params;
    }),
    
    triggerTermFilter: function() {
        this.get('termFilterAction')(this.get("searchedHost"));
    },
    
    actions: {
        filterByTermEvent: function(value) {
            if (value.length >=3 || value.length == 0) {
                Ember.run.debounce(this, this.triggerTermFilter, 1000);
            }
        },
        getDetail: function(value, action) {
            this.get('detailAction')(value);
        },
        deleteHostItem: function(computer) {
            self = this;
            
            computer.destroyRecord().then(
                function() {
                    self.get('data').removeObject(computer);
                }
            );
        },
        updateFields: function(value) {
            this.set('selectedFields', value);
            this.get('updateFieldsAction')(value);
        }
    }
});