describe = QUnit.module;
it = QUnit.test;

Ω.poll.maxMs = 500;
Ω.poll.stepMs = 5;
describe("Ω", function() {
  it('returns a CommandQueue', (assert) => {
    assert.ok( Ω('#canvas') instanceof Ω.CommandQueue );
  });
});
describe("Ω.CommandQueue", function() {
  it('is able to wait for the element', (assert) => {
    setTimeout(()=> jQuery("#canvas").html("<b class='test-element'></b>"),50);

    const done = assert.async();
    const CommandQueue = new Ω.CommandQueue('.test-element')  
    Ω.poll(()=> CommandQueue.found,100)
      .then(() => {
        assert.ok(true)
      })
      .catch(() => {
        assert.ok(false, 'Element should be visible after 1 sec')
      })
      .then(()=>done());
  });
});
describe("Ω.poll", function() {
  it('returns a promise', (assert) => {
    const promise = Ω.poll(()=>true);
    assert.equal(typeof promise.then, 'function');
    assert.equal(typeof promise.catch, 'function');
  });

  it('fails after the a certain ms', (assert) => {
    const done = assert.async();
    Ω.poll(()=>false)
      .catch(()=>{
        assert.ok('Failed as expected')
        done();
      })
  });

  it('passes eventually', (assert) => {
    const done = assert.async();
    let x = 3;
    Ω.poll(()=>x--)
      .then(()=>{
        assert.ok('Failed as expected')
        done();
      })
  });
});