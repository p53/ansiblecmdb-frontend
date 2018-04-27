import Ember from 'ember';
import Host from '../models/host';

export default Ember.Controller.extend({
    user: Ember.inject.service('current-user'),
    queryParams: [
        'page',
        'pageSize',
        'sortField',
        'sortOrder',
        'filterByTerm',
        'selectedFields'
    ],
    filterByTerm: "",
    page: 1,
    pageSize: 10,
    pagerView: 4,
    sortField: "",
    sortOrder: 'asc',
    chartData: [],
    loading: false,
    selectedFields: [],
    fieldsOptions: Ember.computed('user.[]', function(){
        let fields = [];
        
        Ember.get(Host, 'attributes').forEach(function(meta, name) {
            if (name.includes('ansible')) {
                fields.push(name);
            }
        });
        
        return fields.sort();
    }),
    actions: {
        initController: function() {
            let pageNum = this.get('user').get('user').get('settings')['item_page'];
            
            pageNum = pageNum ? pageNum : this.get('pageSize');

            let params = {
                page: this.get('page'),
                pageSize: pageNum,
                pagerView: this.get('pagerView')
            };

            this.transitionToRoute('items', { queryParams: params});
        },
        
        filterByTerm: function(value) {
            let params = {
                page: this.get('page'),
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
        },
        savePageSize: function(value) {
            let params = {
                filterByDate:  this.get('filterByDate'),
                page: 1,
                pageSize: value
            };

            let updatedUser = this.get('user').get('user');
            let settings = updatedUser.get('settings');
                
            if (Array.isArray(settings)) {
                settings = {};
            }
            
            settings['item_page'] = value;
            
            updatedUser.set('settings', settings);
            updatedUser.save();
            
            this.transitionToRoute('items', { queryParams: params});
        },
        updateFields: function(value) {
            let updatedUser = this.get('user').get('user');
            let settings = updatedUser.get('settings');
             
            if (Array.isArray(settings)) {
                settings = {};
            }
            
            settings['item_fields'] = value;
            
            updatedUser.set('settings', settings);
            updatedUser.save();
          
            this.set('selectedFields', value);
            
            if (!value.includes(this.get('sortField'))) {
                this.set('sortField', value[0]);
            }
        }
    }
});    


