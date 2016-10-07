(function(jasmine) {

  var jasmineEnv = jasmine.getEnv();
  var jasmineGlobal = jasmine.getGlobal();

  function waitForSpec(spec) {
    return function(done) {
      var promise = spec.call(jasmine.getGlobal());
      if (!promise || !promise.then) {
        throw new Error('pit() tests must return a promise');
      }
      promise.then({
        success: done,
        failure: done
      });
    }
  }

  function checkPredicate(predicate) {
    return !!predicate.call(jasmineGlobal);
  }

  jasmineGlobal.pit = jasmineEnv.pit = function pit(specName, spec) {
    return jasmineGlobal.it(specName, waitForSpec(spec));
  };

  jasmineGlobal.fpit = jasmineEnv.fpit = function fpit(specName, spec) {
    return jasmineGlobal.fit(specName, waitForSpec(spec));
  };

  jasmineGlobal.xpit = jasmineEnv.xpit = function xpit(specName, spec) {
    return jasmineGlobal.xit(specName, waitForSpec(spec));
  };

  jasmineGlobal.once = jasmineEnv.once = function once(predicate) {
    var deferred = Ext.create('Deft.Deferred');

    function loop() {
      if (checkPredicate(predicate)) {
          deferred.resolve();
        } else {
          setTimeout(loop, 100);
        }
    }

    setTimeout(loop, 100);
    return deferred.promise;
  };

  jasmineGlobal.onceCalled = jasmineEnv.onceCalled = function onceCalled(stubFn, times) {
    times = times || 1;
    return this.once(function() { return stubFn.callCount >= times });
  };

  jasmineGlobal.onceFired = jasmineEnv.onceFired = function onceFired(cmp, evt) {
    var eventStub = this.stub();
    cmp.on(evt, eventStub, jasmine.getGlobal(), {single: true});
    return this.onceCalled(eventStub);
  };

})(jasmine);
