Ext.define('Rally.example.CRUDTesting', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        Rally.data.ModelFactory.getModel({
            type: 'Defect',
            success: this.onModelRetrieved,
            scope: this
        });
    },

    onModelRetrieved: function(model) {
        this.model = model;
        this.createDefect();
    },

    createDefect: function() {
        var record = Ext.create(this.model, {
            Name: 'Server crash',
            State: 'Open',
            Description: 'Worst defect ever'
        });

        record.save({
            callback: this.onRecordCreated,
            scope: this
        });
    },

    onRecordCreated: function(record, operation) {
        if (operation.wasSuccessful()) {
            this.record = record;
            this.readRecord();
        }
    },

    readRecord: function() {
        var id = this.record.get('ObjectID');
        this.model.load(id, {
            fetch: ['Name', 'State', 'Owner'],
            callback: this.onRecordRead,
            scope: this
        });
    },

    onRecordRead: function(record, operation) {
        if(operation.wasSuccessful()) {
            record.set('State', 'Fixed');
            record.save({
                callback: this.onRecordUpdated,
                scope: this
            });
        }
    },

    onRecordUpdated: function(record, operation) {
        if (operation.wasSuccessful()) {
            this.record = record;
            this.deleteRecord();
        }
    },

    deleteRecord: function() {
        this.record.destroy({
            callback: this.onRecordDeleted,
            scope: this
        });
    },

    onRecordDeleted: function(record, operation) {
        if (operation.wasSuccessful()) {
            this.fireEvent('complete', this);
        } else {
            this.fireEvent('error', this, operation.getError());
        }
    }
});
