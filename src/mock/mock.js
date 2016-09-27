(function() {

  var sinonSandbox;

  Ext.define('Rally.test.mock.Mock', {

    constructor: function(config) {
      this.callParent(arguments);
      Ext.apply(this, config);
    },

    mockAppRequests: function() {
        var context = Rally.environment.getContext(),
          project = context.getProject();

        // this.ajax.whenReading('project', project.ObjectID).respondWith(project);

        Rally.test.mock.data.WsapiModelFactory.stubModelCache(sinonSandbox);
        Rally.test.mock.data.WsapiModelFactory.clearModels();
    },

    getAppContext: function(contextConfig) {
      return Rally.environment.getAppContext();
    }
  });

  beforeEach(function() {
    var config = Object.assign(sinon.getConfig(sinon.config), {
      injectInto: this,
      useFakeTimers: false,
      useFakeServer: false
    });
    sinonSandbox = sinon.sandbox.create(config);

    var mock = Rally.test.Mock = Ext.create('Rally.test.mock.Mock', {
      ajax: Ext.create('Rally.test.mock.AjaxBuilder', Ext.create('Rally.test.mock.AjaxInterceptor', sinonSandbox))
    });
    mock.mockAppRequests();
  });

  afterEach(function() {
    sinonSandbox.verifyAndRestore();
    sinonSandbox = null;
  });

})();
