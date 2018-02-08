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