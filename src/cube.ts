import Slice from './slice';

export default class Cube {
  cubes: number[][][];
  size: number;

  constructor(size: number = 5) {
    this.cubes = [];
    this.size = size;

    for (let x: number = 0; x < size; ++x) {
      this.cubes.push([]);
      for (let y: number = 0; y < size; ++y) {
        this.cubes[x].push([]);
        for (let z: number = 0; z < size; ++z) {
          this.cubes[x][y].push(0);
        }
      }
    }

    for (let i = 0; i < 6; ++i) {
      let side = new Slice([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]); 
      side.fill(10**i, 1);
      this.setSlice(side, 'fbrlud'[i]);
    }
  }

  getSlice(side: string, i: number = 0) {
    i = (this.doesSideNeedIndexFix(side) ? this.size - 1 - i : i);

    if (side === 'f' || side === 'b') {
      return new Slice(this.cubes[i].slice())
    } else if (side === 'r' || side === 'l') {
      return new Slice(this.cubes.map(s => s.map(sl => sl[i])));
    } else if (side === 'u' || side === 'd') {
      return new Slice(this.cubes.map(s => s[i]))
    } else {
      return null;
    }
  }

  setSlice(slice: Slice, side: string, i: number = 0) {
    let pieces: number[][] = slice.pieces;
    i = (this.doesSideNeedIndexFix(side) ? this.size - 1 - i : i);

    for (let j: number = 0; j < this.size; ++j) {
      for (let k: number = 0; k < this.size; ++k) {
        if (side === 'f' || side === 'b') {
          this.cubes[i][j][k] = pieces[j][k];
        } else if (side === 'r' || side === 'l') {
          this.cubes[j][k][i] = pieces[j][k];
        } else if (side === 'u' || side === 'd') {
          this.cubes[j][i][k] = pieces[j][k];
        }
      }
    }
  }

  rotateSide(side: string, clockwise: boolean = true) {
    if (side.match(/[A-Z]/)) {
      side = side.toLowerCase();
      clockwise = !clockwise;
    }

    // Rotate the face
    this.rotateLayer(side, {clockwise: clockwise});

    // Rotate the edges and corners
    this.rotateLayer(side, {i: 1, clockwise: clockwise});
  }
  rotateLayer(side: string, options: {i?: number, clockwise?: boolean} = {i: 0, clockwise: true}) {
    this.setSlice(
      this.getSlice(side, options.i).rotate(this.doesSideNeedIndexFix(side) ? !options.clockwise : options.clockwise),
      side,
      options.i);
  }

  doesSideNeedIndexFix(side: string) {
    return side === 'b' || side === 'l' || side === 'd';
  }

  isSolved() {
    for (let side of 'fbrlud') {
      if (!this.getSlice(side).isSolved(1)) {
        return false;
      }
    }
    return true;
  }

  scramble(options: {max_moves: number} = {max_moves: 5}) {
    let moves = [];

    for (let i = 0; i < options.max_moves; ++i) {
      let side = Math.floor(Math.random() * 6);
      this.rotateSide('fbrlud'[side]);
      moves.push('fbrlud'[side]);
    }

    return moves;
  }

  solve(options: {max_moves: number, moves?: string[]} = {max_moves: 10, moves: []}) {
    if (!options.moves) options.moves = [];
    if (options.moves.length == 3) console.log(options.moves);
    if (this.isSolved()) return options.moves;
  
    if (options.moves.length <= options.max_moves) {
      for (let side of 'fFbBrRlLuUdD') {
        if (options.moves.length >= 1) {
          if (side != options.moves[options.moves.length - 1] && side.toLowerCase() == options.moves[options.moves.length - 1].toLowerCase()) {
            continue;
          }
  
          if (options.moves.length >= 2) {
            if (side == options.moves[options.moves.length - 1] && side == options.moves[options.moves.length - 2]) {
              continue;
            }
          }
        }
        options.moves.push(side);
        this.rotateSide(side);
  
        let result = this.solve(options);
        if (result) return result;
        
        this.rotateSide(side, false);
        options.moves.pop();
      }
    }
    return false;
  }
}
