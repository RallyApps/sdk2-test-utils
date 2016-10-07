Ext.define('Rally.example.test.Grid', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        this.add({
            xtype: 'rallygrid',
            columnCfgs: [
                'FormattedID',
                'Name',
                'Owner',
                'State',
                'BlockedReason'
            ],
            context: this.getContext(),
            storeConfig: {
                model: 'defect',
                filters: this._getFilters(),
                listeners: {
                    load: function() {
                        this.fireEvent('ready', this);
                    },
                    scope: this
                }
            }
        });
    },

    onTimeboxScopeChange: function(newTimeboxScope) {
        this.callParent(arguments);

        var grid = this.down('rallygrid');
        grid.store.clearFilter(true);
        grid.store.filter(this._getFilters());
    },

    _getFilters: function() {
        var filters = [{
            property: 'Blocked',
            value: true
        }];
        var timeboxScope = this.getContext().getTimeboxScope();
        if (timeboxScope) {
            filters.push(timeboxScope.getQueryFilter());
        }

        return filters;
    }
});
