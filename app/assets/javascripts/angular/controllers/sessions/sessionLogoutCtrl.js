bugtracker.controller('SessionLogoutCtrl', ['$scope', '$state', function($scope, $state) {
    $state.transitionTo('home');
}]);