"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logDisplay = logDisplay;
exports.formatColor = formatColor;
exports.hexToRgb = hexToRgb;
exports.DisplayMessageScroller = void 0;

var _displayCharTable = require("./display-char-table");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var emptyPadding = '    ';

var DisplayMessageScroller =
/*#__PURE__*/
function () {
  function DisplayMessageScroller(message, color, background) {
    _classCallCheck(this, DisplayMessageScroller);

    this.displaySize = {
      x: 8,
      y: 8
    };
    this.display = null;
    this.messageIndex = null;
    this.message = message + emptyPadding; // append 4 spaces to scroll until an empty screen

    this.color = formatColor(color);
    this.background = formatColor(background || '#000000');
  }

  _createClass(DisplayMessageScroller, [{
    key: Symbol.iterator,
    value: function value() {
      this.display = (0, _displayCharTable.emptyScreen)();
      this.appendPixels = [];
      this.messageIndex = 0;
      return this;
    }
  }, {
    key: "next",
    value: function next() {
      if (this.messageIndex === this.message.length && this.appendPixels.length === 0) {
        return {
          done: true
        };
      } else {
        if (this.appendPixels.length === 0) {
          var charSymbol = this.message[this.messageIndex];
          this.appendPixels = _displayCharTable.charTable[charSymbol] || _displayCharTable.charTable['?'];
          this.messageIndex++;
        }

        var _this$shiftColumn = this.shiftColumn(this.display, this.appendPixels),
            result = _this$shiftColumn.result,
            nextPixels = _this$shiftColumn.nextPixels;

        this.display = result;
        this.appendPixels = nextPixels;
        return {
          done: false,
          value: this.renderPixels(this.display, this.color, this.background)
        };
      }
    }
  }, {
    key: "renderPixels",
    value: function renderPixels(display, color, background) {
      return display.map(function (p) {
        return p ? color : background;
      });
    }
  }, {
    key: "shiftColumn",
    value: function shiftColumn(displayMatrix, next) {
      var _this = this;

      // remove first col deleting pixels with index being a multiple of the nº cols:
      // Ex. 8x8: 0, 8, 16, 24...
      var result = displayMatrix.filter(function (v, i) {
        return i % _this.displaySize.x !== 0;
      });
      var nextCols = next.length / this.displaySize.y;
      var appendCol = [];
      var nextPixels = []; // take first colum of the matrix

      for (var yIndex = 0; yIndex < this.displaySize.y; yIndex++) {
        for (var xIndex = 0; xIndex < nextCols; xIndex++) {
          var pixel = next[yIndex * nextCols + xIndex];

          if (xIndex === 0) {
            appendCol.push(pixel);
          } else {
            nextPixels.push(pixel);
          }
        }
      } // append 1 column using formula i*rows + (cols-1)
      // Ex. 8x8: 7, 15, 23...


      for (var i = 0; i < appendCol.length; i++) {
        var insertIndex = i * this.displaySize.y + (this.displaySize.x - 1);
        result.splice(insertIndex, 0, appendCol[i]);
      }

      return {
        result: result,
        nextPixels: nextPixels
      };
    }
  }]);

  return DisplayMessageScroller;
}();

exports.DisplayMessageScroller = DisplayMessageScroller;

function logDisplay(display, cols, rows, renderValues) {
  var textDisplay = '\n';

  for (var yIndex = 0; yIndex < rows; yIndex++) {
    for (var xIndex = 0; xIndex < cols; xIndex++) {
      if (renderValues) {
        textDisplay += " [".concat(display[yIndex * cols + xIndex], "]");
      } else {
        textDisplay += " ".concat(display[yIndex * cols + xIndex] ? 'x' : '_');
      }
    }

    textDisplay += "\n";
  }

  return textDisplay;
}

function formatColor(color) {
  if (!Array.isArray(color) && typeof color !== 'string') {
    throw new Error("Color is not valid ".concat(color));
  }

  return typeof color === 'string' ? hexToRgb(color) : color;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result || result.length !== 4) {
    throw new Error("'".concat(hex, "' is not a valid color"));
  }

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}