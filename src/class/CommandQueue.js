Ω.CommandQueue = class CommandQueue {
  constructor(selector) {
    this.found = false;
    this.element = false;
    this.promise = Ω.poll(() => {
      const element = jQuery(selector);
      if(element.length){
        this.found = true;
        this.element = element;
        this.runAllCommands();
        return true;
      }
    })
    .catch((err)=> { if(err) throw new Error('Ω Cannot find the specified element!') });
  }

  runAllCommands() {

  }
}

Ω.CommandQueue.factory = (selector) => {
  const handler = {
      get: function(target, name) {
        if(name in target.element) {
          return target.element[name];
        } else if (name in target) {
          return target[name];
        } else {
          return
        }
      }
  };

  return new Proxy(new Ω.CommandQueue(selector), handler);
}
