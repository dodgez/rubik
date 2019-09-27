import Cube from './src/cube';

let cube = new Cube();

let moves = [];
for (let i = 0; i < 5; ++i) {
  let side = Math.floor(Math.random() * 6);
  cube.rotateSide('fbrlud'[side]);
  moves.push('fbrlud'[side]);
}

console.log(`Solving ${moves}`);
