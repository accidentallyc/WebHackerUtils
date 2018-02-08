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