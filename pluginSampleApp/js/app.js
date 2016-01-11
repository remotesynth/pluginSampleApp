angular.module('pluginSampleApp', ['ionic', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      templateUrl: 'templates/home.html',
      controller: 'PluginCtrl'
    })
    .state('app.viewimage', {
      url: '/viewimage',
      templateUrl: 'templates/viewImage.html',
      controller: 'PluginCtrl'
    });
    $urlRouterProvider.otherwise('/app');
})

.controller('PluginCtrl', function($scope, $state) {
    // open the barcode scanner
    $scope.openBarcode = function() {
        $state.go('app.viewimage');
        
    };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
