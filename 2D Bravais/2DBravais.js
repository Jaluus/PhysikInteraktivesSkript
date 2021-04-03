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
    p.background(210);

    SliderC2dBravais.disabled = false
    SliderB2dBravais.disabled = false

    a = parseInt(SliderA2dBravais.value,10)
    b = parseInt(SliderB2dBravais.value,10)
    c = parseInt(SliderC2dBravais.value,10)
    latticeType = Select2dBravais.value

    if (latticeType === "qua"){
      //Done
      b = a
      c = 0
      SliderB2dBravais.disabled = true
      SliderC2dBravais.disabled = true
    }
    else if (latticeType === "sch"){
      //Done
    }
    else if (latticeType === "rec"){
      //Done
      c = 0;
      SliderC2dBravais.disabled = true;
    }
    else if (latticeType === "zen"){
      //Done
      c = parseFloat(a)/2
      SliderC2dBravais.disabled = true;
    }
    else if (latticeType === "hex"){
      //Done
      b = (3**(1/2) / 2) * parseFloat(a)
      c = parseFloat(a)/2
      SliderB2dBravais.disabled = true;
      SliderC2dBravais.disabled = true;
    }
    
    //Each layer
    for(i=0;i*b<p.height;i++){
      p.push()
      //Offset to the Right for each Layer
      let offset = (i*c) % (a)
      p.translate(offset+a/2,b/2)

      //each Atom in the Layer i
      for(j=0;j*a<p.width*1.2;j++){
        //Draw the Cell
        p.push()
        radius = 5
        p.fill(255,0,0)
        p.ellipse(0,0,radius)
        p.fill(0,0,255)
        p.ellipse(10,10,radius)
        p.pop()
        //move one Cell over
        p.translate(a,0)
      }
      p.pop()
      p.translate(0,b)
    }
  }
}

var sBravais2d = new p5(bravais2d, DivID2dBravais);