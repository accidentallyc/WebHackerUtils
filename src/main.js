window['Ω'] = function(selector){
  if(!jQuery){
    throw new Error('jQuery is required!')
  }
  return new Ω.CommandQueue(selector)
}

Ω.noop = ()=>{}