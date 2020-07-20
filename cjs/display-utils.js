"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logDisplay = logDisplay;
exports.formatColor = formatColor;
exports.hexToRgb = hexToRgb;
exports.DisplayMessageScroller = exports.emptyScreen = void 0;

var _emojis = _interopRequireDefault(require("./fonts/emojis.json"));

var _symbols = _interopRequireDefault(require("./fonts/symbols.json"));

var _lowercase = _interopRequireDefault(require("./fonts/lowercase.json"));

var _uppercase = _interopRequireDefault(require("./fonts/uppercase.json"));

var _numbers = _interopRequireDefault(require("./fonts/numbers.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var charTable = _objectSpread({}, _emojis["default"], {}, _symbols["default"], {}, _lowercase["default"], {}, _uppercase["default"], {}, _numbers["default"]);

var emptyScreen = function emptyScreen() {
  return new Array(64).fill(' ');
};

exports.emptyScreen = emptyScreen;

var DisplayMessageScroller =
/*#__PURE__*/
function () {
  function DisplayMessageScroller(message, color, background) {
    _classCallCheck(this, DisplayMessageScroller);

    this.displaySize = {
      x: 8,
      y: 8
    };
    this.display = emptyScreen();
    this.appendPixels = [];
    this.messageIndex = 0;
    this.message = convertRenderMessage(message);
    this.color = formatColor(color);
    this.background = formatColor(background || '#000000');
  }

  _createClass(DisplayMessageScroller, [{
    key: Symbol.iterator,
    value: function value() {
      this.display = emptyScreen();
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
          this.appendPixels = charTable[charSymbol] || charTable['?'];
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
        return p === 'x' ? color : background;
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
      var pixel = display[yIndex * cols + xIndex];

      if (renderValues) {
        textDisplay += " [".concat(formatDigit(pixel[0]), ",").concat(formatDigit(pixel[1]), ",").concat(formatDigit(pixel[2]), "]");
      } else {
        textDisplay += " ".concat(!pixel || pixel.every(function (p) {
          return p === 0;
        }) ? '_' : 'x');
      }
    }

    textDisplay += "\n";
  }

  return textDisplay;
}

function formatDigit(d) {
  if (d > 99) {
    return d.toString();
  } else if (d > 9) {
    return "0".concat(d);
  } else {
    return "00".concat(d);
  }
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

var emptyPadding = '    ';
var letterSpacing = '¶';

function convertRenderMessage(message) {
  // remove diacritics
  message = message.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // append 4 spaces to scroll until an empty screen

  return Array.from(Array.from(message).reduce(function (a, b) {
    return a[a.length - 1] !== ' ' && b !== ' ' ? a + letterSpacing + b : a + b;
  }) + emptyPadding);
}