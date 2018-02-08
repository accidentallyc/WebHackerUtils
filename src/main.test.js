describe = QUnit.module;
it = QUnit.test;

Ω.poll.maxMs = 500;
Ω.poll.stepMs = 5;
describe("Ω", function() {
  it('returns a CommandQueue', (assert) => {
    assert.ok( Ω('#canvas') instanceof Ω.CommandQueue );
  });
});