var service = angular.module('Board');

service.factory('NpcService', ['$timeout',
    function($timeout) {
        var Npc = function(board) {
            this.board = board;
            this.isTurning = false;
            this.maxTries = this.board.bounds.rows * this.board.bounds.cols;
        }

        Npc.prototype.turn = function() {
            var tries = (arguments.length === 1) ? arguments[0] : 0;
            if (tries < this.maxTries && this.board.winner === ' ') {
                this.isTurning = true;
                var ox = Math.floor((Math.random() * 3) + 1);
                var oy = Math.floor((Math.random() * 3) + 1);
                console.log('NPC tries:', ox, oy, this.board.getValue(ox, oy));
                if (this.board.getValue(ox, oy) === ' ') {
                    var that = this;
                    $timeout(function() {
                        that.board.setValue('O', ox, oy);
                        that.isTurning = false;
                    }, 3000);
                    console.log(this);
                } else {
                    this.turn(tries++);
                }
            }
        }

        return Npc;
    }
]);