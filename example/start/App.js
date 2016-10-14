Ext.define('Rally.example.test.GettingStarted', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        this.calculator = Ext.create('Rally.example.test.Calculator', {
            value: 0
        });
        this.add([{
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'rallytextfield',
                    itemId: 'increment'
                },
                {
                    xtype: 'rallybutton',
                    text: '+',
                    listeners: {
                        click: this._onAdd,
                        scope: this
                    }
                }
            ]
        }, {
              xtype: 'component',
              itemId: 'total',
              tpl: '= {total}',
              data: {
                  total: this.calculator.getValue()
              }
        }]);
    },

    _onAdd: function() {
        var increment = this.down('#increment');
        var newValue = this.calculator.add(parseInt(increment.getValue(), 10));
        this.down('#total').update({
            total: this.calculator.getValue()
        });
        increment.setValue();
    }
});
