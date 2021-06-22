import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | listings', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:listings');
    assert.ok(route);
  });
});
