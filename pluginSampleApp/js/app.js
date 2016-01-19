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
    $scope.imageURL = scannedURL;
    $scope.share = function() {
        plugins.socialsharing.share(null, null, scannedURL, null, function() {
            var options = {
              id:         1,
              at:         new Date(),
              text:       "Your friends will thank you",
              title:      "You shared the image",
              autoClear:  true
            };

            cordova.plugins.notification.local.schedule(options);
        });
    }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
