/**
 * Swap array positions in place.
 */
export function swap<T>(arr: Array<T>, a: number, b: number) {
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}
