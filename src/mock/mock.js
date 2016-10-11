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

        Rally.test.mock.data.WsapiModelFactory.stubModelCache(sinonSandbox);
        Rally.test.mock.data.WsapiModelFactory.clearModels();
    },

    getAppContext: function(contextConfig) {
      return Rally.environment.getAppContext();
    }
  });

  beforeEach(function() {
    var config = Ext.apply(sinon.getConfig(sinon.config), {
      injectInto: this,
      useFakeTimers: false,
      useFakeServer: false
    });
    sinonSandbox = sinon.sandbox.create(config);

    var ajax = Ext.create('Rally.test.mock.AjaxBuilder', Ext.create('Rally.test.mock.AjaxInterceptor', sinonSandbox));
    var mock = Rally.test.Mock = Ext.create('Rally.test.mock.Mock', {
      ajax: ajax,
      dataFactory: Rally.test.mock.ModelObjectMother
    });
    mock.mockAppRequests();

    this.ajax = ajax;
    this.dataFactory = Rally.test.mock.ModelObjectMother;
  });

  afterEach(function() {
    sinonSandbox.verifyAndRestore();
    sinonSandbox = null;
  });

})();
