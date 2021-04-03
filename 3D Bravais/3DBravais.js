var DivID3dBravais = "3dBravais";
var SliderAID3dBravais = "3dBravaisSliderA"
var SliderBID3dBravais = "3dBravaisSliderB"
var SliderCID3dBravais = "3dBravaisSliderC"
var SliderAlphaID3dBravais = "3dBravaisSliderAlpha"
var SliderBetaID3dBravais = "3dBravaisSliderBeta"
var SliderGammaID3dBravais = "3dBravaisSliderGamma"

var divCanvas3dBravais = document.getElementById(DivID3dBravais);
var divX3dBravais = parseInt(divCanvas3dBravais.style.width, 10);
var divY3dBravais = parseInt(divCanvas3dBravais.style.height, 10);

var SliderA3dBravais = document.getElementById(SliderAID3dBravais);
var SliderB3dBravais = document.getElementById(SliderBID3dBravais);
var SliderC3dBravais = document.getElementById(SliderCID3dBravais);

var SliderAlpha3dBravais = document.getElementById(SliderAlphaID3dBravais);
var SliderBeta3dBravais = document.getElementById(SliderBetaID3dBravais);
var SliderGamma3dBravais = document.getElementById(SliderGammaID3dBravais);

var Select3dBravais = document.getElementById("3dBravaisSelect");

var bravais3d = function (p) {
  p.a = 200;
  p.b = 200;
  p.c = 200;

  p.atomSize = 20;
  p.repeat = false;
  p.connect = false;
  p.orthoCam = true;

  let currentAngleX = 45;
  let currentAngleY = 45;

  let currentCell;

  p.mouseInFrame = function(){
    if(p.mouseX < p.width && p.mouseX > 0 && p.mouseY > 0 && p.mouseY < p.height){
      return true
    }
    return false
  }

  p.getCurrentCell = function(cellName){

    let S_arr = [
      //x,y,z,color
      [0, 0, 0, 0],
      [0, p.a*Math.tan(p.f), p.a, 0],
      [p.c, p.a*Math.tan(p.f), p.a+p.c* Math.tan(p.d), 0],
      [p.c, 0, p.c* Math.tan(p.d), 0],
      [p.b*Math.tan(p.e), p.b, 0, 0],
      [p.b*Math.tan(p.e), p.b+p.a*Math.tan(p.f), p.a, 0],
      [p.c+p.b*Math.tan(p.e), p.b+p.a*Math.tan(p.f), p.a+p.c* Math.tan(p.d), 0],
      [p.c+p.b*Math.tan(p.e), p.b, p.c* Math.tan(p.d), 0],
    ];
    let BC_arr = [
      //x,y,z,color
      [0, 0, 0, 0],
      [0, p.a*Math.tan(p.f), p.a, 0],
      [p.c, p.a*Math.tan(p.f), p.a+p.c* Math.tan(p.d), 0],
      [p.c, 0, p.c* Math.tan(p.d), 0],
      [p.b*Math.tan(p.e), p.b, 0, 0],
      [p.b*Math.tan(p.e), p.b+p.a*Math.tan(p.f), p.a, 0],
      [p.c+p.b*Math.tan(p.e), p.b+p.a*Math.tan(p.f), p.a+p.c* Math.tan(p.d), 0],
      [p.c+p.b*Math.tan(p.e), p.b, p.c* Math.tan(p.d), 0],
      [(p.c+p.b*Math.tan(p.e)) / 2, (p.b+p.a*Math.tan(p.f)) / 2, (p.a+p.c* Math.tan(p.d)) / 2, 0],
    ];
    let FC_arr = [
      [0, 0, 0, 0],
      [p.c / 2, p.b / 2, 0, 0],
      [p.c / 2, 0, p.a / 2, 0],
      [0, p.b / 2, p.a / 2, 0],
      [p.c / 2, p.b / 2, p.a, 0],
      [p.c / 2, p.b, p.a / 2, 0],
      [p.c, p.b / 2, p.a / 2, 0],
      [0, 0, p.a, 0],
      [0, p.b, 0, 0],
      [p.c, 0, 0, 0],
      [p.c, p.b, p.a, 0],
      [p.c, p.b, 0, 0],
      [0, p.b, p.a, 0],
      [p.c, 0, p.a, 0],
    ];
    let EC_arr = [
      [0, 0, 0, 0],
      [0, p.a*Math.tan(p.f), p.a, 0],
      [p.c, p.a*Math.tan(p.f), p.a+p.c* Math.tan(p.d), 0],
      [p.c, 0, p.c* Math.tan(p.d), 0],
      [p.b*Math.tan(p.e), p.b, 0, 0],
      [p.b*Math.tan(p.e), p.b+p.a*Math.tan(p.f), p.a, 0],
      [p.c+p.b*Math.tan(p.e), p.b+p.a*Math.tan(p.f), p.a+p.c* Math.tan(p.d), 0],
      [p.c+p.b*Math.tan(p.e), p.b, p.c* Math.tan(p.d), 0],
      [0, p.b / 2, p.a / 2, 0],
      [p.c,p.b / 2, p.a / 2 + p.c* Math.tan(p.d), 0],
    ]; 
    let Dia_arr = [
      [0, 0, 0, 0],
      [(p.a * 3) / 4, (p.a * 3) / 4, (p.a * 1) / 4, 1],
      [(p.a * 1) / 4, (p.a * 3) / 4, (p.a * 3) / 4, 1],
      [(p.a * 1) / 4, (p.a * 1) / 4, (p.a * 1) / 4, 1],
      [(p.a * 3) / 4, (p.a * 1) / 4, (p.a * 3) / 4, 1],
      [p.a / 2, p.a / 2, 0, 0],
      [p.a / 2, 0, p.a / 2, 0],
      [0, p.a / 2, p.a / 2, 0],
      [p.a / 2, p.a / 2, p.a, 0],
      [p.a / 2, p.a, p.a / 2, 0],
      [p.a, p.a / 2, p.a / 2, 0],
      [0, 0, p.a, 0],
      [0, p.a, 0, 0],
      [p.a, 0, 0, 0],
      [p.a, p.a, p.a, 0],
      [p.a, p.a, 0, 0],
      [0, p.a, p.a, 0],
      [p.a, 0, p.a, 0],
    ];

    let type = cellName.split("")[0] 

    if(cellName =="DIAMOND"){
      return Dia_arr
    }
    if (type == "S"){
      return S_arr;
      }
    else if (type == "B"){
      return BC_arr;
    }
    else if(type =="F"){
      return FC_arr;
    }
    else if(type =="E"){
      return EC_arr;
    }
  }

  p.rotateTheLattice = function(){
    if (p.mouseIsPressed && p.mouseInFrame()) {
      currentAngleX -= p.pmouseX - p.mouseX;
      currentAngleY += p.pmouseY - p.mouseY;
    }

    p.rotateY(currentAngleX / 100);
    p.rotateZ(currentAngleY / 100);
  }
  
  p.drawPerimeter = function() {
    //Bounding box is always of Simple Type
    let BB = p.getCurrentCell("SC")
    p.push();
    p.noFill();
    p.stroke(0);
    p.strokeWeight(4);

    p.beginShape();
    for (let i = 0; i<BB.length/2;i++){
      let px = BB[i][0]
      let py = BB[i][1]
      let pz = BB[i][2]
      p.vertex(px,py,pz);
    }
    p.endShape(p.CLOSE);
    p.beginShape();
    for (let i = BB.length/2; i<BB.length;i++){
      let px = BB[i][0]
      let py = BB[i][1]
      let pz = BB[i][2]
      p.vertex(px,py,pz);
    }
    p.endShape(p.CLOSE);
    for(let i = 0; i<4;i++){
      p.beginShape();
      p.vertex(BB[i][0],BB[i][1],BB[i][2]);
      p.vertex(BB[i+4][0],BB[i+4][1],BB[i+4][2]);
      p.endShape(p.CLOSE);
    }

    p.pop();
  }

  p.setLatticeParameters = function(cellName){
    
    SliderC3dBravais.disabled = false
    SliderB3dBravais.disabled = false

    SliderAlpha3dBravais.disabled = false
    SliderBeta3dBravais.disabled = false
    SliderGamma3dBravais.disabled = false

    let lat = cellName.split("")[1] 

    let a =  parseInt(SliderA3dBravais.value,10)
    let b =  parseInt(SliderB3dBravais.value,10)
    let c =  parseInt(SliderC3dBravais.value,10)

    let d =  parseInt(SliderAlpha3dBravais.value,10)
    let e =  parseInt(SliderBeta3dBravais.value,10)
    let f =  parseInt(SliderGamma3dBravais.value,10)


    //CUBIC
    if (lat == "C" || cellName =="DIAMOND"){
      SliderB3dBravais.disabled = true
      SliderC3dBravais.disabled = true
      SliderAlpha3dBravais.disabled = true
      SliderBeta3dBravais.disabled = true
      SliderGamma3dBravais.disabled = true

      p.a = a
      p.b = a
      p.c = a
      p.d = 0
      p.e = 0
      p.f = 0
    }
    //TETRAGONAL
    else if (lat == "T"){
      SliderC3dBravais.disabled = true
      SliderAlpha3dBravais.disabled = true
      SliderBeta3dBravais.disabled = true
      SliderGamma3dBravais.disabled = true
      p.a = a
      p.b = a
      p.c = b
      p.d = 0
      p.e = 0
      p.f = 0
    }
    //ORTHOROMBIC
    else if(lat =="O"){
      SliderAlpha3dBravais.disabled = true
      SliderBeta3dBravais.disabled = true
      SliderGamma3dBravais.disabled = true
      p.a = a
      p.b = b
      p.c = c
      p.d = 0
      p.e = 0
      p.f = 0
    }
    //HEXAGONAL
    else if(lat =="H"){
      SliderC3dBravais.disabled = true
      SliderAlpha3dBravais.disabled = true
      SliderBeta3dBravais.disabled = true
      SliderGamma3dBravais.disabled = true
      p.a = a
      p.b = a
      p.c = b
      p.d = 0
      p.e = 0
      p.f = 30/180 * Math.PI
    }
    //TRIGONAL
    else if(lat =="D"){
      SliderB3dBravais.disabled = true
      SliderC3dBravais.disabled = true
      SliderBeta3dBravais.disabled = true
      SliderGamma3dBravais.disabled = true
      p.a = a
      p.b = a
      p.c = a
      p.d = d/180 * Math.PI
      p.e = d/180 * Math.PI
      p.f = d/180 * Math.PI
    }
    //MONOCLINIC
    else if(lat =="M"){
      SliderBeta3dBravais.disabled = true
      SliderGamma3dBravais.disabled = true
      p.a = a
      p.b = b
      p.c = c
      p.d = d/180 * Math.PI
      p.e = 0
      p.f = 0
    }
    //TRICLINIC
    else if(lat =="E"){
      p.a = a
      p.b = b
      p.c = c
      p.d = d/180 * Math.PI
      p.e = e/180 * Math.PI
      p.f = f/180 * Math.PI
    }
  }

  p.setup = function () {
    p.createCanvas(divX3dBravais, divY3dBravais, p.WEBGL);
    p.setAttributes('antialias', true);
    p.pixelDensity(1);
    p.ortho(-p.width / 2, p.width / 2, -p.height / 2, p.height / 2, 0, 5000);

    // currentCell = p.getCurrentCell("SC");
    // p.setLatticeParameters("SC")
  };

  p.draw = function () {
    p.background(210);

    let currentCellName = Select3dBravais.value

    p.setLatticeParameters(currentCellName)
    currentCell = p.getCurrentCell(currentCellName)
    p.pointLight(255, 255, 255, 0, 0, 300);

    p.rotateTheLattice()
    p.translate( -1*(p.c+p.b*Math.tan(p.e)) / 2, -1*(p.b+p.a*Math.tan(p.f)) / 2, -1*(p.a+p.c*Math.tan(p.d)) / 2);
    p.drawPerimeter()
    if (!p.repeat) {
      p.drawCell(currentCell);

      if (p.connect) {
        p.connectAtoms(currentCell);
      }
    }
    else {
      if (p.connect) {
        p.connectAtoms(currentCell);
      }

      for (f = -2; f < 3; f++) {
        for (g = -2; g < 3; g++) {
          for (h = -2; h < 3; h++) {
            p.drawCell(currentCell, f * p.c, g * p.b, h * p.a);
          }
        }
      }
    }
  };

  p.drawCell = function (cell, offsetX = 0, offsetY = 0, offsetZ = 0) {
    for (i = 0; i < cell.length; i++) {
      p.push();
      p.translate(
        cell[i][0] + offsetX,
        cell[i][1] + offsetY,
        cell[i][2] + offsetZ
      );
      p.fill(250 * cell[i][3], 250 * (1 - cell[i][3]), 0);
      p.noStroke()
      p.sphere(p.atomSize);
      p.pop();
    }
  };

  p.toggleOrtho = function () {
    if (p.orthoCam) {
      p.perspective(p.PI / 3.0, p.width / p.height, 0.1, 5000);
    } else {
      p.ortho(-p.width / 2, p.width / 2, -p.height / 2, p.height / 2, 0, 5000);
    }

    p.orthoCam = !p.orthoCam;
  };

  p.connectAtoms = function (cell) {
    let record = Infinity;

    //finding the shortest Distance to neighbors
    //you just need to check one atom against the others, as it is always touching others and therefore has the shortest distance
    let x1, y1, z1, color1;
    [x1, y1, z1, color1] = cell[0];

    //finding the distance to the neighbors
    for (j = 1; j < cell.length; j++) {
      let x2, y2, z2, color2;
      [x2, y2, z2, color2] = cell[j];

      let dist = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;

      if (record >= dist) {
        record = dist;
      }
    }

    //Drawing the connections with the shortest distance
    for (i = 0; i < cell.length; i++) {
      let x1, y1, z1, color1;
      [x1, y1, z1, color1] = cell[i];
      // start at i+1 to make sure we just connect each atom once! also its faster
      for (j = i + 1; j < cell.length; j++) {
        let x2, y2, z2, color2;
        [x2, y2, z2, color2] = cell[j];

        let dist = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;
        if (dist <= record) {
          p.push();
          p.stroke(0, 0, 255);
          p.strokeWeight(6);
          p.line(x1, y1, z1, x2, y2, z2);
          p.pop();
        }
      }
    }
  };
};

function toggleRepeat() {
  sBravais3d.repeat = !sBravais3d.repeat;
}

function toggleConnect() {
  sBravais3d.connect = !sBravais3d.connect;
}

function toggleOrtho() {
  sBravais3d.toggleOrtho();
}

var sBravais3d = new p5(bravais3d, DivID3dBravais);
