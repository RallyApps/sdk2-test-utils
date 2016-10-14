describe('Rally.example.test.Calculator', function() {

  it('should have an initial value of 0', function() {
    var calculator = Ext.create('Rally.example.test.Calculator');
    expect(calculator.getValue()).toBe(0);
  });

  it('should be able to be instantiated with an initial value', function() {
    var calculator = Ext.create('Rally.example.test.Calculator', { value: 5 });
    expect(calculator.getValue()).toBe(5);
  });

  describe('#add', function() {

    var calculator;

    beforeEach(function() {
      calculator = Ext.create('Rally.example.test.Calculator');
    });

    it('should support positive numbers', function() {
      expect(calculator.add(5).getValue()).toBe(5);
    });

    it('should support negative numbers', function() {
      expect(calculator.add(-5).getValue()).toBe(-5);
    });

    it('should enable chaining', function() {
      expect(calculator.add(5).add(5).getValue()).toBe(10);
    });

    it('should error on non-numeric input', function() {
      expect(function() {
        calculator.add('hi');
      }).toThrowError(TypeError, 'Rally.example.test.Calculator.add: Expected numeric value');
    });
  });
});
