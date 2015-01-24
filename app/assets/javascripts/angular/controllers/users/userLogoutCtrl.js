bugtracker.controller('UserLogoutCtrl', ['$scope', '$state', function($scope, $state) {
    $state.transitionTo('home');
}]);