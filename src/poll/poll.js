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