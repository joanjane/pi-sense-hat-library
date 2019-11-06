"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joystick = require("./joystick");

Object.keys(_joystick).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _joystick[key];
    }
  });
});

var _display = require("./display");

Object.keys(_display).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _display[key];
    }
  });
});