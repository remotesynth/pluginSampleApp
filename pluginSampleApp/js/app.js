var scannedURL;

angular.module('pluginSampleApp', ['ionic', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      templateUrl: 'templates/home.html',
      controller: 'PluginCtrl'
    })
    .state('viewimage', {
      url: '/viewimage',
      templateUrl: 'templates/viewImage.html',
      controller: 'ImageCtrl'
    });
    $urlRouterProvider.otherwise('/app');
})

.controller('PluginCtrl', function($scope, $state) {
    $scope.foo = "bar";
    // open the barcode scanner
    $scope.openBarcode = function() {
        cordova.plugins.barcodeScanner.scan(

            // success callback function
            function (result) {
                scannedURL = result.text;
                $state.go('viewimage');
            },

            // error callback function
            function (error) {
                alert("Scanning failed: " + error);
            },

            // options object
            {
                "preferFrontCamera" : false,
                "showFlipCameraButton" : true
            }
         );
        
    };
})

.controller('ImageCtrl', function($scope) {
    // $scope.imageURL = 'https://45.media.tumblr.com/ff06c2c5c03293265f24d8721571eee4/tumblr_n6r8b62SJC1tbhzz6o1_400.gif';
    $scope.imageURL = scannedURL;
    $scope.share = function() {
        plugins.socialsharing.share(null, null, scannedURL);
    }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
