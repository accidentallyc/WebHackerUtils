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