import { swap } from "./swap";

/**
 * Recursive permute function. Returns all permutations of elements of a given array.
 *
 * @template T
 * @param {Array<T>} arr
 * @param {number | undefined} n
 * @returns {Array<Array<T>>}
 */
function permuteR<T>(arr: Array<T>, cb: (arr: Array<T>) => void, n?: number) {
  n ??= arr.length;
  if (n === 1) {
    cb(arr.slice());
    return;
  }

  permuteR(arr, cb, n - 1);

  for (let i = 0; i < n - 1; i++) {
    if (n % 2 === 0) {
      swap(arr, i, n - 1);
    } else {
      swap(arr, 0, n - 1);
    }

    permuteR(arr, cb, n - 1);
  }
}

/**
 * Returns all permutations of elements of a given array.
 *
 * @template T
 * @param {Array<T>} items
 * @returns {Array<Array<T>>}
 */
export function permute<T>(items: Array<T>) {
  const arr: Array<Array<T>> = [];
  permuteR(items, (perm) => arr.push(perm));
  return arr;
}
