import Ember from 'ember';
import Host from '../models/host';

export default Ember.Controller.extend({
    user: Ember.inject.service('current-user'),
    queryParams: [
        'page',
        'pageSize',
        'sortField',
        'sortOrder',
        'filterByDate',
        'filterByTerm',
        'static',
        'selectedFields',
        'graphFields'
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
    graphFields: [],
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
        dateInit: function(sortedDates) {           
            if (!this.get('filterByDate') && !this.get('static')) {
                let pageNum = this.get('user').get('user').get('settings')['host_page'];
                pageNum = pageNum ? pageNum : this.get('pageSize');
                
                let params = {
                    filterByDate: sortedDates.get('firstObject').get('key'),
                    page: this.get('page'),
                    pageSize: pageNum,
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
            
            settings['host_page'] = value;
            
            updatedUser.set('settings', settings);
            updatedUser.save();
            
            this.transitionToRoute('hosts', { queryParams: params});
        },
        updateFields: function(value) {
            let updatedUser = this.get('user').get('user');
            let settings = updatedUser.get('settings');
                
            if (Array.isArray(settings)) {
                settings = {};
            }
            
            settings['host_fields'] = value;
            
            updatedUser.set('settings', settings);
            updatedUser.save();
            
            this.set('selectedFields', value);
            
            if (!value.includes(this.get('sortField'))) {
                this.set('sortField', value[0]);
            }
        },
        updateGraphFields: function(value) {
            let updatedUser = this.get('user').get('user');
            let settings = updatedUser.get('settings');

            if (Array.isArray(settings)) {
                settings = {};
            }
                
            this.set('graphFields', value);

            settings['graph_fields'] = value;

            updatedUser.set('settings', settings);
            updatedUser.save();
        }
    }
});    


