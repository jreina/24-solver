/**
 * Returns a subset of the input array containing the first `n` items specified. Curried.
 * @example
 * take(3)([5, 4, 3, 2, 1]); // <- [5, 4, 3]
 */
export function take<T>(n: number) {
  return function (arr: Array<T>) {
    return arr.slice(0, n);
  };
}
