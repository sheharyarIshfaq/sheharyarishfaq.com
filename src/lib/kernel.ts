export const COLUMNS = 56;
export const ROWS = 9;
export const BLOCKS = 7;
export const BLOCK_WIDTH = COLUMNS / BLOCKS;

// 5×7 pixel glyphs for the letters in the name.
const GLYPHS: Record<string, string[]> = {
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
};

export const WORD = "SHEHARYAR";

// Letters sit six columns apart, starting at row 1, column 1.
function litCells() {
  const lit = new Set<string>();
  [...WORD].forEach((letter, index) => {
    GLYPHS[letter].forEach((row, y) => {
      [...row].forEach((bit, x) => {
        if (bit === "1") lit.add(`${x + 1 + index * 6}:${y + 1}`);
      });
    });
  });
  return lit;
}

const lit = litCells();

export function isLit(x: number, y: number) {
  return lit.has(`${x}:${y}`);
}
