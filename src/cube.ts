import Slice from './slice';

export default class Cube {
  cubes: number[][][];

  constructor() {
    this.cubes = [];

    for (let x = 0; x < 5; ++x) {
      this.cubes.push([]);
      for (let y = 0; y < 5; ++y) {
        this.cubes[x].push([]);
        for (let z = 0; z < 5; ++z) {
          this.cubes[x][y].push(0);
        }
      }
    }
  }

  getSlice(i: number, side: string) {
    let data: number[][] = [];

    for (let j = 0; j < 5; ++j) {
      data.push([]);
      for (let k = 0; k < 5; ++k) {
        let piece;

        if (side == 'f') {
          piece = this.cubes[i][j][k];
        } else if (side == 'r') {
          piece = this.cubes[j][k][i];
        } else if (side == 'u') {
          piece = this.cubes[k][i][j];
        }

        data[j][k] = piece;
      } 
    }

    return new Slice(data);
  }

  setSlice(slice: Slice, i: number, side: string) {
    let pieces = slice.pieces;

    for (let j = 0; j < 5; ++j) {
      for (let k = 0; k < 5; ++k) {
        if (side == 'f') {
          this.cubes[i][j][k] = pieces[j][k];
        } else if (side == 'r') {
          this.cubes[j][k][i] = pieces[j][k];
        } else if (side == 'u') {
          this.cubes[k][i][j] = pieces[j][k];
        }
      }
    }
  }
}
