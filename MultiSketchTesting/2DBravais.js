var DivID2dBravais = "2dBravais";

var divCanvas2dBravais = document.getElementById(DivID2dBravais);
var divX2dBravais = parseInt(divCanvas2dBravais.style.width, 10);
var divY2dBravais = parseInt(divCanvas2dBravais.style.height, 10);

var bravais2d = function(p){
  
  let a = 30
  let b = 40
  p.setup = function(){
  p.createCanvas(divX2dBravais, divY2dBravais);
  }

  p.draw = function(){
    p.background(220);
    
    for(i=0;i*a<p.width;i++){
        for(j=0;j*b<p.height;j++){
          let x = (i+0.5)*a
          let y = (j+0.5)*b
          p.push()
          p.noFill()
          p.ellipse(x,y,2)
          p.pop()
        }
    }
  }
}


var sBravais2d = new p5(bravais2d, DivID2dBravais);