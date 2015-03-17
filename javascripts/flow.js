var app = angular.module('flow', []);

app.directive('timer', [function() {
  return {
    restrict: 'AE',
    scope: {},
    template: '<div class="set-timer">' +
                '<form ng-submit="">' +
                  '<input type="number" ng-model="delay" ng-change="updateDelay()" />' +
                  '<h4 ng-show="delay">Timer set at every <span class="red-color">{{delay}}</span> minutes</h4>' +
                  '<h4 ng-hide="delay">Input a number please ...</h4>' +
                '</form>' +
              '</div>',
    controller: function($scope, $element) {

      $scope.delay = 30;

      var popup = function() {
        alert("Get up and move! It's been " + $scope.delay + " minutes!!!");
      }

      var popupLoop = function() {
        var d = legitDelay($scope.delay);

        $scope.timeout = setTimeout(function() {
          popup();
          popupLoop();
        }, d * 60000); // 60000 ms in a minute
      }

      $scope.updateDelay = function() {
        clearTimeout($scope.timeout);

        popupLoop();
      }

      function legitDelay(delay) {
        if(delay < 1 || delay === undefined) {
          return 1;
        }
        else if(delay > 90) { // Timer should be no longer than 90 minutes
          $scope.delay = 90;
          return 24;
        }
        else {
          return delay;
        }
      }

      popupLoop();
    },
    link: function(scope, element, attrs) {

    }
  }
}]);