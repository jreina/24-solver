export type Op = ((x: number, y: number) => number) & { notation: string };

export const add: Op = (x, y) => x + y;
export const sub: Op = (x, y) => x - y;
export const mult: Op = (x, y) => x * y;
export const div: Op = (x, y) => x / y;
export const ops = [add, sub, mult, div];

add.notation = "+";
sub.notation = "-";
mult.notation = "*";
div.notation = "/";