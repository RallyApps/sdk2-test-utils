(function() {

    var app;
    Ext.define('Rally.test.sdk.Bootstrapper', {
        singleton: true,

        launchApp: function(appCls, config) {
            config = config || {};
            app = Ext.create(appCls, Ext.apply(config, {
                context: Rally.environment.getAppContext(),
                renderTo: 'testDiv',
                appScopedSettings: {},
                workspaceScopedSettings: {},
                projectScopedSettings: {},
                userScopedSettings: {}
            }));
            return app;
        },

        destroyApp: function() {
          if (app) {
            app.destroy();
            app = null;
          }
        }
    }, function() {
    
      Rally.launchApp = function(appCls, config) {
          return Rally.test.sdk.Bootstrapper.launchApp(appCls, config);
      };

      Rally.destroyApp = function() {
        Rally.test.sdk.Bootstrapper.destroyApp();
      };
    });
})();
