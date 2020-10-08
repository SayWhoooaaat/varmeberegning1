let img;
let alloyData;
let table = [];
let tableWidth;
let elementTemp;

function preload() {
  img = loadImage('Sketch1.png');
  img2 = loadImage('Sketch2.png');
  img3 = loadImage('Sketch3.png');
  alloyData = loadJSON("alloys.json");
}

function setup() {
  createCanvas(520, 1500);
  background(255);
  image(img, 10, 50, 300, 300);

  // creating UI boxes
  voltUI = new UIparameter('Spenning:', 'V', 230, true);
  powerUI = new UIparameter('Effekt:', 'W', 4700, true);
  tempUI = new UIparameter('Ovnstemp.:', '\u00B0C', 630, true);
  resUI = new UIparameter('Motstand:', '\u03A9', null, false);
  lengthUI = new UIparameter('Spirallengde', 'mm', 840, true);
  diaUI = new UIparameter('Ytterspiraldia.', 'mm', 45, true);

  
  calculate();
  reDraw();

}

function draw() { // Dont use

}



function keyPressed() {
  if (keyCode === ENTER) {
    registerInput();
    calculate();
    reDraw();
  }
}

function registerInput() {
  // Update input parameters
  voltUI.value = float(voltUI.inputField.value());
  powerUI.value = float(powerUI.inputField.value());
  tempUI.value = float(tempUI.inputField.value());
  lengthUI.value = float(lengthUI.inputField.value());
  diaUI.value = float(diaUI.inputField.value());
}

function calculate() {
  // calculate R & temp
  resUI.value = voltUI.value * voltUI.value / powerUI.value;
  
  elementTemp = tempUI.value + 100;
  

  // calculate table
  tableCalc();

}

function reDraw() {
  //Drawing stage 1
  background(255);
  image(img, 10, 50, 300, 300);
  voltUI.show(110, 50);
  powerUI.show(240, 160);
  tempUI.show(34, 264);
  resUI.showOutput(194, 264);

  //Drawing stage 2
  image(img2, 40, 320, 300, 200);
  lengthUI.show(120, 370);
  diaUI.show(168,474);
  image(img3, 370, 400, 90, 100);


  //Drawing stage 3
  //background(255);
  tableDraw(20, 550);

}



/* UNØYAKTIGHETER:

Er ikke toggle for kontaktor/thyristor
Kina-N80 kan ha andre verdier

*/

