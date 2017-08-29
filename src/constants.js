"use strict";

// uri for API calls
export var apiUrl = window.location.origin + "/api";

export function filterInPlace(arr, f) {
  var out = 0;
  for (var i = 0; i < arr.length; i++) {
    if (f(arr[i], i)) {
      arr[out++] = arr[i];
    }
  }
  arr.length = out;
  return arr;
}

export function mapReverse(arr, f) {
  var out = []
  for (var i = arr.length-1; i >= 0; i--) {
    out.push(f(arr[i], i));
  }
  return out;
}
