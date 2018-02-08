window['Ω'] = function(selector){
  if(!jQuery){
    throw new Error('jQuery is required!')
  }
  return new Ω.CommandQueue(selector)
}

Ω.noop = ()=>{}
Ω.CommandQueue = function (selector){
  Ω.poll(() => {
    const element = jQuery(selector);
    if(element.length){
      this.found = true;
      this.element = element;
      this.runAllCommands()
      return true;
    }
  })
  .catch((err)=> { if(err) throw new Error('Ω Cannot find the specified element!') });

  this._cmd = [];
  this.cmd = (cmd) => this._cmd.push(cmd) 
  this.runAllCommands = () => {
    this._cmd.forEach((cmd)=>{
      this["_"+cmd]();
    })

    return true
  }
  this.click = () => this.cmd('click');
  this._click = ()=> this.element.click();
}
Ω.poll = (conditionFn,maxMs = Ω.poll.maxMs,stepMs = Ω.poll.stepMs) => {
  if(typeof conditionFn !== 'function' )
    throw new Error('conditionFn must be a function!');
  return new Promise((resolve, reject) => {
    let currMs = 0;

    const interval = setInterval(() => {
      currMs += stepMs;
      return Promise
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