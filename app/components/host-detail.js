import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    
    ec2Facts: Ember.computed('hostDetails.[]', function() {
        let data = {};
        self = this;
        
        this.get('hostDetails').eachAttribute(function(elem) {
            if ( elem.includes('ansibleEc2') ) {
                data[elem] = self.get('hostDetails').get(elem);
            }
        }, data);

        return data;
    }),
    processorNames: Ember.computed('hostDetails.[]', function() {
        let data = [];
        let details = this.get('hostDetails').get('ansibleProcessor');

        for (var i = 0; i < details.length; i++) {
            if((i % 2) ) {
                data.push(details[i]);
            }
        }
        return data;
    }),
    memoryFacts: Ember.computed('hostDetails.[]', function() {
        let data = {};
        data['ansibleSwapfreeMb'] = this.get('hostDetails')['ansibleSwapfreeMb'];
        data['ansibleSwaptotalMb'] = this.get('hostDetails')['ansibleSwaptotalMb'];
        data['ansibleMemfreeMb'] = this.get('hostDetails')['ansibleMemfreeMb'];
        data['ansibleMemtotalMb'] = this.get('hostDetails')['ansibleMemtotalMb'];
        data['ansibleMemoryMb'] = this.get('hostDetails')['ansibleMemoryMb'];
        return data;
    }),
    storageFacts: Ember.computed('hostDetails.[]', function() {
        let data = {};
        data['ansibleMounts'] = this.get('hostDetails').get('ansibleMounts');
        data['ansibleDevices'] = this.get('hostDetails').get('ansibleDevices');
        let ansibleLvm = this.get('hostDetails').get('ansibleLvm');
        
        for(var vg in ansibleLvm['vgs']) {
            for(var lv in ansibleLvm['lvs']) {
                if(ansibleLvm['lvs'][lv]['vg'] == vg) {
                    if(! ansibleLvm['vgs'][vg]['lvs']) {
                        ansibleLvm['vgs'][vg]['lvs'] = {};
                    }
                    
                    ansibleLvm['vgs'][vg]['lvs'][lv] = ansibleLvm['lvs'][lv];
                }
            };
        };
        
        data['vgs'] = ansibleLvm['vgs'];

        return data;
    }),
    boxHiddenAll: false,
    boxHidden: {
        'machine': false,
        'cpu': false,
        'memory': false,
        'network': false,
        'storage': false,
        'ec2': false,
        'virtualization': false,
        'operating_system': false
    },
    localNotesFocus: false,
    globalNotesFocus: false,
    actions: {
        toggleBox: function(classToHide) {
            if(!this.get('boxHidden')[classToHide]) {
                this.$('.' + classToHide).slideUp();
                
                let flags = this.get('boxHidden');
                flags[classToHide] = true;
                this.set('boxHidden', flags);
            } else {
                this.$('.' + classToHide).slideDown();
                
                let flags = this.get('boxHidden');
                flags[classToHide] = false;
                this.set('boxHidden', flags);
            }
        },
        toggleBoxAll: function() {
            if(!this.get('boxHiddenAll')) {
                for(var box in this.get('boxHidden')) {
                    this.$('.' + box).slideUp();

                    let flags = this.get('boxHidden');
                    flags[box] = true;
                    this.set('boxHidden', flags);
                }
                this.set('boxHiddenAll', true);
            } else {
                for(var box in this.get('boxHidden')) {
                    this.$('.' + box).slideDown();

                    let flags = this.get('boxHidden');
                    flags[box] = false;
                    this.set('boxHidden', flags);
                }        
                this.set('boxHiddenAll', false);                
            }
        },
        focusGlobalNotes: function(component, event) {
            this.set('globalNotesFocus', true);
        },        
        focusNotes: function(component, event) {
            this.set('localNotesFocus', true);
        },
        save: function(component, event) {
            this.set('localNotesFocus', false);
            var self = this;
            
            this.get('hostDetails').get('note').then(
                function(note) {
                    let store = self.get('store');
                    
                    if(!note) {
                        note = store.createRecord(
                            'note', 
                            {
                                ansible_machine_id: self.get('hostDetails').get('ansibleMachineId'),
                                ansible_product_uuid: self.get('hostDetails').get('ansibleProductUuid'),
                                note: note.get('note')
                            }
                        );
                        //note.get('hosts').pushObject(this.get('hostDetails'));                        
                    }
                    
                    note.save().then(
                        function(note) {
                            self.get('hostDetails').save(); 
                        }
                    );                     
                },
                function(note) {
                    console.log("aaa");
                }        
            );

        }
    }
});