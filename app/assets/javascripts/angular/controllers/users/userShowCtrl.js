bugtracker.controller('UserShowCtrl', ['$scope', '$stateParams', 'user', function($scope, $stateParams, user) {
    $scope.user = user;
}]);