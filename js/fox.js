// TODO: use query params for these
var Chance = require('chance');
var chance = new Chance();

var hsl = function (h, s, l) {
  return "hsl(" + h + "," + s + "%, " + l + "%)";
}

var Fox = function (IMG_WIDTH, IMG_HEIGHT) {

  // head top left corner
  var origin = {x: IMG_WIDTH / 4, y: IMG_HEIGHT / 4};
  // TODO: head headWidth and height
  var headWidth = IMG_WIDTH / 2;
  var headHeight = IMG_HEIGHT / 2;
  var kappa = chance.floating({min: 0.2, max: 0.45})

  var hue = chance.integer({min: 5, max: 50});
  var saturation = chance.integer({min: 70, max: 90});
  var lightness = chance.integer({min: 40, max: 60});
  var headColor = hsl(hue, saturation, lightness);

  var ears = (function () {
    var offsetX = chance.floating({min: 0.17 * headWidth, max: 0.2 * headWidth});
    var angle = chance.floating({min: 0.05 * Math.PI, max: 0.2 * Math.PI});
    // TODO: size
    return {
      color: headColor,
      kappa: 0.9 * kappa,
      left: {
        x: origin.x + (headWidth/2) - offsetX,
        y: origin.y + (0.15 * headHeight),
        angle: angle,
        width: 0.4 * headWidth,
        height: 0.6 * headHeight
      },
      right: {
        x: origin.x + (headWidth/2) + offsetX,
        y: origin.y + (0.15 * headHeight),
        angle: -angle,
        width: 0.4 * headWidth,
        height: 0.6 * headHeight
      }
    };
  }());

  var eyes = (function () {
    // TODO: color
    var offsetY = chance.floating({min: -0.05 * headHeight, max: 0.05 * headHeight});
    var offsetX = chance.floating({min: 0.13 * headWidth, max: 0.25 * headWidth});

    var eyeHeight = chance.floating({min: 0.08 * headHeight, max: 0.13 * headHeight});

    return {
      height: eyeHeight,
      width: eyeHeight/2,
      left: {
        x: origin.x + (headWidth/2) - offsetX,
        y: origin.y + (headHeight/2) + offsetY
      },
      right: {
        x: origin.x + (headWidth/2) + offsetX,
        y: origin.y + (headHeight/2) + offsetY
      }
    }
  }());

  var nose = (function (eyes) {
    return {
      x: origin.x + (headWidth/2),
      y: (eyes.left.y + 0.3 * (origin.y + headHeight - eyes.left.y)),
      width: 0.06 * headWidth,
      height: 0.05 * headWidth
    }
  }(eyes));

  return {
    canvas: {
      height: IMG_HEIGHT,
      width: IMG_WIDTH,
      color: hsl(
        chance.integer({min:0, max:360}),
        chance.integer({min:0, max:100}),
        chance.integer({min:10, max:100})
      )
    },
    head: {
        origin: origin,
        width: headWidth,
        height: headHeight,
        color: headColor,
        kappa: kappa,
        maskColor: hsl(hue, saturation, 95),
        maskWidth: chance.integer({min: 0.5 * IMG_WIDTH, max: IMG_WIDTH}),
        maskHeight: chance.integer({min: 0.85 * IMG_HEIGHT, max: 1 * IMG_HEIGHT})
    },
    ears: ears,
    eyes: eyes,
    nose: nose,
    // mouth: mouth
  };
};

module.exports = Fox;
