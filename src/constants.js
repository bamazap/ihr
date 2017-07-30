"use strict";

// uri for API calls
export var apiUrl = window.location.origin + "/api.php";

export function filterInPlace(arr, f) {
  var out = 0;
  for (var i = 0; i < arr.length; i++) {
    if (f(arr[i])) {
      arr[out++] = arr[i];
    }
  }
  arr.length = out;
  return arr;
}
