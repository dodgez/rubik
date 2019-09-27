import Cube from './src/cube';

let cube = new Cube();

let moves = [];
for (let i = 0; i < 5; ++i) {
  let side = Math.floor(Math.random() * 6);
  cube.rotateSide('fbrlud'[side]);
  moves.push('fbrlud'[side]);
}

console.log(`Solving ${moves}`);
solve(cube);

function solve(cube: Cube, moves: string[] = []) {
  if (moves.length == 3) console.log(moves);
  if (cube.isSolved()) {
    console.log(moves);
    return true;
  }

  if (moves.length <= 6) {
    for (let side of 'fFbBrRlLuUdD') {
      if (moves.length >= 1) {
        if (side != moves[moves.length - 1] && side.toLowerCase() == moves[moves.length - 1].toLowerCase()) {
          continue;
        }

        if (moves.length >= 2) {
          if (side == moves[moves.length - 1] && side == moves[moves.length - 2]) {
            continue;
          }
        }
      }
      moves.push(side);
      cube.rotateSide(side);

      if (solve(cube, moves)) return true;
      
      cube.rotateSide(side, false);
      moves.pop();
    }
  }
  return false;
}
