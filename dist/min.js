window['Ω'] = (selector) => {
  if(!jQuery){
    throw new Error('jQuery is required!')
  }

  return Ω.CommandQueue.factory(selector)
}

Ω.noop = ()=>{}
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

Ω.poll = (conditionFn,maxMs = Ω.poll.maxMs,stepMs = Ω.poll.stepMs) => {
  if(typeof conditionFn !== 'function' )
    throw new Error('conditionFn must be a function!');
  return new Promise((resolve, reject) => {
    let currMs = 0;

    const interval = setInterval(() => {
      currMs += stepMs;
      Promise
        .resolve(conditionFn())
        .then((result, error) => {
          if(result !== null && result !== undefined && result !== false){
            clearInterval(interval);
            resolve(result);
          } else if ( currMs > maxMs){
            clearInterval(interval);
            reject( new Error(`Unable to resolve condition within ${maxMs} ms`) );
          }

          if(error) console.warn("Poll error",error);
        })
    }, stepMs);


  });
}

Ω.poll.maxMs = 30000;
Ω.poll.stepMs = 250;