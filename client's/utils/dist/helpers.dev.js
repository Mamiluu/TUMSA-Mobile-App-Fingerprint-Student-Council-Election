"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = save;
exports.getValueFor = getValueFor;
exports.formatDate = formatDate;
exports.subtractDays = subtractDays;
exports.numberWithCommas = numberWithCommas;
exports.proc = proc;

var SecureStore = _interopRequireWildcard(require("expo-secure-store"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// utils/helpers.js
function save(key, value) {
  return regeneratorRuntime.async(function save$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(SecureStore.setItemAsync(key, value));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getValueFor(key) {
  var result;
  return regeneratorRuntime.async(function getValueFor$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(SecureStore.getItemAsync(key));

        case 2:
          result = _context2.sent;

          if (!result) {
            _context2.next = 8;
            break;
          }

          console.log("🔐 Here's your value 🔐 \n" + result);
          return _context2.abrupt("return", result);

        case 8:
          console.log("No values stored under that key.");
          return _context2.abrupt("return", result);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

function subtractDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} // Define and export the proc function


function proc() {
  console.log('proc function called');
}
//# sourceMappingURL=helpers.dev.js.map
