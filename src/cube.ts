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
          this.cubes[x][y].push(x + 10*y + 100*z);
        }
      }
    }
  }

  getSlice(side: string, i: number = 0) {
    i = (this.doesSideNeedIndexFix(side) ? this.size - 1 - i : i);

    if (side === 'f' || side === 'b') {
      return new Slice(this.cubes[i].slice())
    } else if (side === 'r' || side === 'l') {
      return new Slice(this.cubes.map(s => s[i]))
    } else if (side === 'u' || side === 'd') {
      return new Slice(this.cubes.map(s => s.map(sl => sl[i])));
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
          this.cubes[k][i][j] = pieces[j][k];
        }
      }
    }
  }

  rotateSide(side: string, clockwise: boolean = true) {
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
}
