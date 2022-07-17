import { ops } from "../utils/operations";
import { permute } from "../utils/permute";
import { take } from "../utils/take";

/**
 * Given a set of 4 numbers, finds all the permutations of the numbers and arithmetic operations
 * which produces the target value. The default target value is 24.
 */
export function solve(nums: [number, number, number, number], target = 24) {
  const cardPerms = permute(nums);
  const opPerms = permute(ops).map(take(3));

  const solutions = cardPerms
    .flatMap(([a, b, c, d]) =>
      opPerms.map(([f, g, h]) => ({
        value: h(g(f(a, b), c), d),
        formula: `(((${a} ${f.notation}) ${b} ${g.notation}) ${c} ${h.notation}) ${d}`,
      }))
    )
    .filter((candidate) => candidate.value === target);

  return solutions;
}
