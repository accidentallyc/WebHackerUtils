window['Ω'] = (selector) => {
  if(!jQuery){
    throw new Error('jQuery is required!')
  }

  return Ω.CommandQueue.factory(selector)
}

Ω.noop = ()=>{}