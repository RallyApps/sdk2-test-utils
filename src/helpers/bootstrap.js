(function() {

    Ext.define('Rally.test.sdk.Bootstrapper', {
        singleton: true,

        launchApp: function(appCls, config) {
            config = config || {};
            this.app = Ext.create(appCls, Ext.apply(config, {
                context: Rally.environment.getAppContext()
            }));
            this.viewport = Ext.create('Ext.Viewport', {
                layout: 'fit',
                items: [ this.app ]
            });

            return this.app;
        },

        destroyApp: function() {
            this.viewport.destroy();
            delete this.viewport;
            delete this.app;
        }
    }, function() {
      Rally.launchApp = function(appCls, config) {
        Rally.test.sdk.Bootstrapper.launchApp(appCls, config);
      };

      Rally.destroyApp = function() {
        Rally.test.sdk.Bootstrapper.destroyApp();
      };

      Rally.onReady = function(onReady) {
        //TODO: need to load css resources, etc.
        Ext.onReady(onReady);
      }
    });
})();
