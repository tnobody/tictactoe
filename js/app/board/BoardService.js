var board = angular.module('Board', []);
board.factory('BoardService', [
    function() {
        function Board(rows, cols) {
            this.bounds = {
                rows: rows,
                cols: cols
            };
            this.state = [];
            for (r = 0; r < rows; r++) {
                var _row = [];
                for (c = 0; c < cols; c++) {
                    _row.push(' ');
                }
                this.state.push(_row);
            }
            this.winner = ' ';
        }
        ;

        Board.prototype.setValue = function(v, x, y) {
            if (this._inRange(x, 1, this.bounds.rows) && this._inRange(y, 1, this.bounds.cols)) {
                this.state[x - 1][y - 1] = v;
                if (this._hasWon(v)) {
                    alert(v + ' is the winner');
                    this.winner = v;
                }
            }
        };
        Board.prototype.getValue = function(x, y) {
            return this.state[x-1][y-1];
        };
        Board.prototype.reset = function() {
            this.state = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ];
        };
        Board.prototype._inRange = function(v, min, max) {
            return (v >= min && v <= max);
        };
        Board.prototype._hasWon = function(v) {
            return (this._wonByColumn(v) || this._wonByRow(v) || this._wonByDiagonal(v));
        };
        Board.prototype._wonByRow = function(v) {
            var thisRow = true;
            for (r = 0; r < this.state.length; ++r) {
                thisRow = true;
                for (c = 0; c < this.state[r].length; ++c) {
                    thisRow = thisRow && (this.state[r][c] === v);
                }
                if (thisRow) {
                    return thisRow;
                }
            }
        };
        Board.prototype._wonByColumn = function(v) {
            var thisRow = true;
            for (c = 0; c < this.bounds.cols; ++c) {
                thisRow = true;
                for (r = 0; r < this.bounds.rows; ++r) {
                    thisRow = thisRow && (this.state[r][c] === v);
                }
                if (thisRow) {
                    return thisRow;
                }
            }
        };
        Board.prototype._wonByDiagonal = function(v) {
            for (c = 0; c < this.bounds.cols; ++c) {
                for (r = 0; r < this.bounds.rows; ++r) {
                    count = 0;
                    var ri = r;
                    var ci = c;
                    while (ci < this.bounds.cols && ri < this.bounds.rows) {
                        count = (this.state[ri][ci] === v) ? count + 1 : 0;
                        ci++;
                        ri++;
                    }
                    if (count === 3) {
                        return true;
                    }
                }
                for (r =  this.bounds.rows-1; r > 0; --r) {
                    count = 0;
                    var ri = r;
                    var ci = c;
                    while (ci < this.bounds.cols && ri >= 0) {
                        count = (this.state[ri][ci] === v) ? count + 1 : 0;
                        ci++;
                        ri--;
                    }
                    if (count === 3) {
                        return true;
                    }
                }
            }
            return false;
        }

        return Board;
    }
]);