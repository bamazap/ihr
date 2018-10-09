// uri for API calls
export const apiUrl = `${window.location.origin}/api`;

/* eslint-disable no-param-reassign */
export function filterInPlace(arr, f) {
  let out = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (f(arr[i], i)) {
      arr[out] = arr[i];
      out += 1;
    }
  }
  arr.length = out;
  return arr;
}

export function mapReverse(arr, f) {
  const out = [];
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    out.push(f(arr[i], i));
  }
  return out;
}
