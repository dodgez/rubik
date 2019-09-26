export default class Slice {
  pieces: number[][];
  size: number;

  constructor(pieces: number[][] = [[0,0,0,0,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,0,0,0,0]]) {
    this.pieces = pieces;
    this.size = pieces.length;
  }

  rotate(clockwise: boolean = true) {
    let rotated_pieces = this.pieces.map(slice => slice.map(piece => piece));

    for (let x = 0; x < this.size; ++x) {
      for (let y = 0; y < this.size; ++y) {
        if (clockwise) {
          rotated_pieces[y][this.size-x] = this.pieces[x][y];
        } else {
          rotated_pieces[this.size-y][x] = this.pieces[x][y];
        }
      }
    }

    this.pieces = rotated_pieces;
  }

  isSolved(buffer: number = 0) {
    let sum = 0;
    for (let x = buffer; x < this.size - buffer; ++x) {
      for (let y = buffer; y < this.size - buffer; ++y) {
        sum += this.pieces[x][y];
      }
    }

    return sum === (this.size-2*buffer)*(this.size-2*buffer)*this.pieces[buffer][buffer];
  }

  fill(pattern: number, buffer: number = 0) {
    for (let x = buffer; x < this.size - buffer; ++x) {
      for (let y = buffer; y < this.size - buffer; ++y) {
        this.pieces[x][y] = pattern;
      }
    }
  }
}