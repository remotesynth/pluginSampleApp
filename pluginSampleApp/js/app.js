var scannedURL;

angular.module('pluginSampleApp', ['ionic', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      templateUrl: 'templates/home.html',
      controller: 'PluginCtrl'
    });
    $urlRouterProvider.otherwise('/app');
})

.controller('PluginCtrl', function($scope, $state) {
	
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
