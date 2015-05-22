bugtracker.controller('UserConfirmEmailCtrl', ['$scope', '$state', function($scope, $state) {
    $state.transitionTo('users.login');
}]);