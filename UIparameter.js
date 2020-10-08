class UIparameter {
  
  constructor(passedTitle,passedUnit,defaultValue,inputBool){
    this.title = passedTitle;
    this.unit = passedUnit;
    this.x = null;
    this.y = null;
    this.value = defaultValue;
    this.input = inputBool;
    
  }
  
  show(passedX, passedY){
    this.x = passedX;
    this.y = passedY;
    text(this.title, this.x, this.y);
    this.inputField = createInput(nf(this.value));
    this.inputField.size(32,16);
    this.inputField.position(this.x,this.y+6);
    text(this.unit,this.inputField.x + this.inputField.width+6, this.inputField.y+15);
    
    
  }
  
  showOutput(passedX, passedY){
    this.x = passedX;
    this.y = passedY;
    text(this.title, this.x, this.y);
    let dispValue = Number.parseFloat(this.value).toFixed(2);
    push();
    textSize(18);
    text(dispValue, this.x, this.y + 20)
    text(this.unit, this.x + textWidth(dispValue)+6, this.y + 20)
    pop();
    
    
  }
  
}