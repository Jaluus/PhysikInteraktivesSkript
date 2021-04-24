var DivID2dBravais = "2dBravais";
var SliderAID2dBravais = "2dBravaisSliderA";
var SliderBID2dBravais = "2dBravaisSliderB";
var SliderCID2dBravais = "2dBravaisSliderC";

var SliderUID2dBravais = "2dBravaisSliderU";
var SliderVID2dBravais = "2dBravaisSliderV";

var SelectID2dBravais = "2dBravaisSelect";
var ParamsID2dBravais = "2dBravaisBasisParams";

var divCanvas2dBravais = document.getElementById(DivID2dBravais);
var divX2dBravais = parseInt(divCanvas2dBravais.style.width, 10);
var divY2dBravais = parseInt(divCanvas2dBravais.style.height, 10);

var SliderA2dBravais = document.getElementById(SliderAID2dBravais);
var SliderB2dBravais = document.getElementById(SliderBID2dBravais);
var SliderC2dBravais = document.getElementById(SliderCID2dBravais);

var SliderU2dBravais = document.getElementById(SliderUID2dBravais);
var SliderV2dBravais = document.getElementById(SliderVID2dBravais);

var Select2dBravais = document.getElementById(SelectID2dBravais);
var Params2dBravais = document.getElementById(ParamsID2dBravais);

var basisParamsHidden = true;

var bravais2d = function (p) {
  var a = 30;
  var b = 40;
  var c = 0;
  var u = 0;
  var v = 0;

  var radius = 10;

  var latticeType = "SC";

  p.setup = function () {
    p.createCanvas(divX2dBravais, divY2dBravais);
    p.noFill();
  };

  p.checkLatticeType = function () {
    SliderC2dBravais.disabled = false;
    SliderB2dBravais.disabled = false;

    let af = parseInt(SliderA2dBravais.value, 10);
    let bf = parseInt(SliderB2dBravais.value, 10);
    let cf = p.radians(parseFloat(SliderC2dBravais.value, 10));

    let uf = 0;
    let vf = 0;
    if (!basisParamsHidden) {
      uf = parseInt(SliderU2dBravais.value, 10);
      vf = parseInt(SliderV2dBravais.value, 10);
    }
    latticeType = Select2dBravais.value;

    if (latticeType === "qua") {
      //Done
      bf = af;
      cf = 0;
      SliderB2dBravais.disabled = true;
      SliderC2dBravais.disabled = true;
    } else if (latticeType === "sch") {
      //Done
    } else if (latticeType === "rec") {
      //Done
      cf = 0;
      SliderC2dBravais.disabled = true;
    } else if (latticeType === "zen") {
      //Done
      //to catch out of bounds clip it,
      // TODO better solution!
      let q = -af / (2 * bf);
      q = p.max(-0.99, p.min(0.99, q));
      cf = Math.asin(q);
      SliderC2dBravais.disabled = true;
    } else if (latticeType === "hex") {
      //Done
      bf = af;
      cf = p.radians(-30);
      SliderB2dBravais.disabled = true;
      SliderC2dBravais.disabled = true;
    }
    return [af, bf, cf, uf, vf];
  };

  p.draw = function () {
    p.background(210);

    // No idea why it need the proxy varibale varArr, but its not working if im not using it
    let varArr = p.checkLatticeType();
    [a, b, c, u, v] = varArr;
    p.drawLattice();
    p.drawRezi();

    // middelLine
    p.strokeWeight(4);
    p.line(p.width / 2, 0, p.width / 2, p.height);
  };

  p.drawLattice = function () {
    //Vectors of the Cell
    p.push();
    p.translate((p.width / 2) * 0.5, p.height * 0.5);
    p.strokeWeight(4);
    p.line(0, 0, a, 0);
    p.line(0, 0, -b * Math.sin(c), -b * Math.cos(c));
    p.strokeWeight(1);

    let xatoms = p.width / 2 / a;
    let yatoms = p.height / (b * Math.cos(c));

    for (
      let i = -parseInt(yatoms / 2) - 1;
      i <= parseInt(yatoms / 2) + 1;
      i++
    ) {
      p.push();
      //Offset to the Right for each Layer
      var offsetx = (i * b * Math.sin(c)) % a;
      var offsety = i * b * Math.cos(c);
      p.translate(0, offsety);

      //each Atom in the Layer i
      for (
        let j = -parseInt(xatoms / 2) - 1;
        j <= parseInt(xatoms / 2) + 1;
        j++
      ) {
        //Check for overlap
        if (a * j + offsetx > p.width / 4) {
          break;
        }
        // if (a * j + offset - radius / 2 < -p.width / 4) {
        //   continue;
        // }
        p.push();
        p.translate(a * j + offsetx, 0);
        p.fill(255, 0, 0);
        p.noStroke();
        p.drawBasis(a * j + offsetx, offsety);
        // p.fill(0,0,255)
        // p.ellipse(10,10,radius)
        //move one Cell over
        p.pop();
      }
      p.pop();
    }
    //Draw The text Last
    p.textSize(20);
    p.fill(0);
    p.textStyle(p.BOLD);
    let textAng = -p.atan(40 / b);
    p.text("a = " + Math.round(a * 100) / 100, a / 2 - 5, 20);
    // p.rotate(-c);
    // p.translate(-10, -b / 2 + 5);
    // //p.rotate(-Math.PI / 2);
    // p.text("b", 0, 0);
    p.text(
      "b = " + Math.round(b * 100) / 100,
      -(b / 2) * Math.sin(c + textAng),
      -(b / 2) * Math.cos(c + textAng) + 5
    );
    p.pop();
  };

  p.drawRezi = function () {
    let ra = ((2 * Math.PI) / a) * 800;
    let rb = ((2 * Math.PI) / b) * 800;
    let rc = c;
    p.push();
    p.translate((p.width / 2) * 1.5, p.height * 0.5);
    p.strokeWeight(4);
    p.line(0, 0, 0, -ra);
    p.line(0, 0, -rb * Math.cos(c), rb * Math.sin(c));
    p.strokeWeight(1);

    let xatoms = p.width / 2 / (rb * Math.cos(rc));
    let yatoms = p.height / ra;

    for (
      let i = -parseInt(xatoms / 2) - 1;
      i <= parseInt(xatoms / 2) + 1;
      i++
    ) {
      p.push();
      //Offset to the Right for each Layer
      var offsetx = i * rb * Math.cos(c);
      var offsety = i * rb * Math.sin(c);
      p.translate(offsetx, 0);

      //each Atom in the Layer i
      for (
        let j = -parseInt(yatoms / 2) - 25;
        j <= parseInt(yatoms / 2) + 25;
        j++
      ) {
        //Check for overlap
        if (offsetx < -p.width / 4) {
          continue;
        }
        if (offsetx > p.width / 4) {
          break;
        }
        // if (a * j + offset - radius / 2 < -p.width / 4) {
        //   continue;
        // }
        p.push();
        p.translate(0, ra * j - offsety);
        p.fill(0, 0, 255);
        p.noStroke();
        p.drawBasis(offsetx, ra * j - offsety);
        p.pop();
      }
      p.pop();
    }
    p.textSize(20);
    p.textStyle(p.BOLD);
    p.fill(0);
    let textAng = p.atan(40 / rb) + Math.PI / 2;
    p.text("a* = " + Math.round((ra / 800) * 1000) / 1000, 10, -ra / 2);
    p.text(
      "b* = " + Math.round((rb / 800) * 1000) / 1000,
      -(rb / 2) * Math.sin(rc + textAng),
      -(rb / 2) * Math.cos(rc + textAng) + 5
    );
    p.pop();
  };

  p.drawBasis = function (x, y) {
    p.ellipse(0, 0, radius);

    if (!basisParamsHidden) {
      if (x + u > p.width / 4 || x + u < -p.width / 4) {
        return;
      }
      p.ellipse(u, v, radius);
    }
  };
};

function toggleBasis() {
  basisParamsHidden = !basisParamsHidden;
  Params2dBravais.hidden = basisParamsHidden;
}

var sBravais2d = new p5(bravais2d, DivID2dBravais);
