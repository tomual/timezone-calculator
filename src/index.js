"use strict";
exports.__esModule = true;
var moment = require("moment");
var now = moment().format('LLLL');
document.body.textContent = now;
console.log("Hello");
