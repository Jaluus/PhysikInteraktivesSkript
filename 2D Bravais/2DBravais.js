var DivID2dBravais = "2dBravais";
var SliderAID2dBravais = "2dBravaisSliderA"
var SliderBID2dBravais = "2dBravaisSliderB"
var SliderCID2dBravais = "2dBravaisSliderC"
var SelectID2dBravais = "2dBravaisSelect"

var divCanvas2dBravais = document.getElementById(DivID2dBravais);
var divX2dBravais = parseInt(divCanvas2dBravais.style.width, 10);
var divY2dBravais = parseInt(divCanvas2dBravais.style.height, 10);

var SliderA2dBravais = document.getElementById(SliderAID2dBravais);
var SliderB2dBravais = document.getElementById(SliderBID2dBravais);
var SliderC2dBravais = document.getElementById(SliderCID2dBravais);

var Select2dBravais = document.getElementById("2dBravaisSelect");

var bravais2d = function(p){
  
  let a = 30
  let b = 40
  let latticeType = "SC" 

  p.setup = function(){
    p.createCanvas(divX2dBravais, divY2dBravais);
    p.noFill()
  }

  p.draw = function(){
    p.background(220);

    a = parseInt(SliderA2dBravais.value,10)
    b = parseInt(SliderB2dBravais.value,10)
    c = parseInt(SliderC2dBravais.value,10)
    latticeType = Select2dBravais.value
    
    for(i=0;i*a<p.width;i++){
      p.push()
      let offset = (i*c) % (b-1)
      p.translate(0,offset)
      for(j=0;j*b<p.height*1.2;j++){
        //Draw the Cell
        p.fill(255,0,0)
        p.ellipse(0,0,5)
        p.noFill()
        p.translate(0,b)
      }
      p.pop()
      p.translate(a,0)
    }
  }
}

var sBravais2d = new p5(bravais2d, DivID2dBravais);