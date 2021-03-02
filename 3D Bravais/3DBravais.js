var DivID3dBravais = "3dBravais";

var divCanvas3dBravais = document.getElementById(DivID3dBravais);
var divX3dBravais = parseInt(divCanvas3dBravais.style.width, 10);
var divY3dBravais = parseInt(divCanvas3dBravais.style.height, 10);

var bravais3d = function (p) {
  p.a = 200;
  p.atomSize = 20;
  p.repeat = false;
  p.connect = false;
  p.orthoCam = true;

  let currentAngleX = 45;
  let currentAngleY = 45;

  let currentCell;

  let SC_arr = [
    [0, 0, 0, 0],
    [0, 0, p.a, 0],
    [0, p.a, 0, 0],
    [p.a, 0, 0, 0],
    [p.a, p.a, p.a, 0],
    [p.a, p.a, 0, 0],
    [0, p.a, p.a, 0],
    [p.a, 0, p.a, 0],
  ];

  let BCC_arr = [
    [0, 0, 0, 0],
    [p.a / 2, p.a / 2, p.a / 2, 0],
    [0, 0, p.a, 0],
    [0, p.a, 0, 0],
    [p.a, 0, 0, 0],
    [p.a, p.a, p.a, 0],
    [p.a, p.a, 0, 0],
    [0, p.a, p.a, 0],
    [p.a, 0, p.a, 0],
  ];

  let FCC_arr = [
    [0, 0, 0, 0],
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

  p.setup = function () {
    p.createCanvas(divX3dBravais, divY3dBravais, p.WEBGL);
    p.pixelDensity(1);
    p.ortho(-p.width / 2, p.width / 2, -p.height / 2, p.height / 2, 0, 5000);

    currentCell = SC_arr;
  };

  p.draw = function () {
    p.background(255);
    p.noStroke();
    p.pointLight(255, 255, 255, 0, 0, 300);

    if (p.mouseIsPressed) {
      currentAngleX -= p.pmouseX - p.mouseX;
      currentAngleY += p.pmouseY - p.mouseY;
    }

    p.rotateY(currentAngleX / 100);
    p.rotateZ(currentAngleY / 100);

    //Draw the Bounding box
    p.push();
    p.noFill();
    p.stroke(0);
    p.strokeWeight(2);
    p.box(p.a, p.a, p.a);
    p.pop();

    //set Rotaionpoint to the middle;
    p.translate(-p.a / 2, -p.a / 2, -p.a / 2);

    if (!p.repeat) {
      p.drawCell(currentCell);
    } else {
      for (f = -2; f < 3; f++) {
        for (g = -2; g < 3; g++) {
          for (h = -2; h < 3; h++) {
            p.drawCell(currentCell, f * p.a, g * p.a, h * p.a);
          }
        }
      }
    }
    
    if (p.connect) {
      p.connectAtoms(currentCell);
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

  p.changeGrid = function (i) {
    switch (i) {
      case 0:
        currentCell = SC_arr;
        break;
      case 1:
        currentCell = BCC_arr;
        break;
      case 2:
        currentCell = FCC_arr;
        break;
      case 3:
        currentCell = Dia_arr;
        break;
    }
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

function toggleGrid(i) {
  sBravais3d.changeGrid(i);
}

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
