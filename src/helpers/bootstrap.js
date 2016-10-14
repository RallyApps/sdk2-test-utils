(function() {

    var app;
    Ext.define('Rally.test.Harness', {
        singleton: true,

        launchApp: function(appCls, config) {
            app = Ext.create(appCls, Ext.apply({
                context: Rally.environment.getAppContext(),
                renderTo: 'testDiv',
                appScopedSettings: {},
                workspaceScopedSettings: {},
                projectScopedSettings: {},
                userScopedSettings: {}
            }, config));
            return app;
        },

        destroyApp: function() {
          if (app) {
            app.destroy();
            app = null;
          }
        }
    });
})();
