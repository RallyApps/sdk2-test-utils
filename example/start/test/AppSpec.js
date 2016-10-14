describe('Rally.example.test.GettingStarted', function() {

  var app;

  beforeEach(function() {
    app = Rally.test.Harness.launchApp('Rally.example.test.GettingStarted', {});  //todo: better way to launch app?
  });

  function expectTotalToBe(value) {
    var total = app.down('#total').getEl().dom;
    expect(total.innerHTML).toBe('= ' + value);
  }

  function performAdd(value) {
    var increment = app.down('#increment');
    increment.setValue(value);
    var add = app.down('rallybutton');
    add.fireEvent('click');
  }

  it('display the initial calculator value', function() {
    expectTotalToBe(0);
  });

  it('should update the total when adding', function() {
    performAdd(5);
    expectTotalToBe(5);
  });

  it('should update the total when adding', function() {
    performAdd(5);
    expect(app.down('#increment').getValue()).toBe('');
  });
});
