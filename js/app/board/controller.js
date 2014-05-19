var board = angular.module('Board');

board.controller('BoardController', ['$scope', 'BoardService', 'NpcService',
    function($scope, BoardService, NpcService) {
        console.log(arguments);
        
        $scope.setTo = function(x, y) {
            $scope.board.setValue('X', x + 1, y + 1);
            $scope.npc.turn();
        }
        $scope.reset = function() {
            $scope.board = new BoardService(3, 3);
            $scope.npc = new NpcService($scope.board);
        }
        
        $scope.reset();
    }
]);