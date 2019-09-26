export default class Slice {
  pieces: number[][];
  size: number;

  constructor(pieces: number[][] = [[0,0,0,0,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,0,0,0,0]]) {
    this.pieces = pieces;
    this.size = pieces.length;
  }

  rotate(clockwise: boolean = true) {
    let rotated_pieces: number[][] = this.pieces.map(s => s.slice());

    for (let x: number = 0; x < this.size; ++x) {
      for (let y: number = 0; y < this.size; ++y) {
        if (clockwise) {
          rotated_pieces[y][this.size-x-1] = this.pieces[x][y];
        } else {
          rotated_pieces[this.size-y-1][x] = this.pieces[x][y];
        }
      }
    }

    this.pieces = rotated_pieces;

    return this;
  }

  isSolved(buffer: number = 0) {
    let sum: number = 0;
    for (let x: number = buffer; x < this.size - buffer; ++x) {
      for (let y: number = buffer; y < this.size - buffer; ++y) {
        sum += this.pieces[x][y];
      }
    }

    return sum === (this.size-2*buffer)*(this.size-2*buffer)*this.pieces[buffer][buffer];
  }

  fill(pattern: number, buffer: number = 0) {
    for (let x: number = buffer; x < this.size - buffer; ++x) {
      for (let y: number = buffer; y < this.size - buffer; ++y) {
        this.pieces[x][y] = pattern;
      }
    }
  }
}