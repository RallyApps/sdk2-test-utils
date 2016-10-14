Ext.define('Rally.example.test.Calculator', {
    value: 0,

    constructor: function(config) {
        Ext.apply(this, config);
        this.callParent(arguments);
    },

    add: function(value) {
        if (isNaN(value)) {
            throw new TypeError('Rally.example.test.Calculator.add: Expected numeric value');
        }
        this.value += value;
        return this;
    },

    getValue: function() {
        return this.value;
    }
});
