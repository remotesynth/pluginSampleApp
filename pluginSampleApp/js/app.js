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
      controller: 'PluginCtrl'
    });
    $urlRouterProvider.otherwise('/app');
})

.controller('PluginCtrl', function($scope, $state) {
    // open the barcode scanner
    $scope.openBarcode = function() {
        cordova.plugins.barcodeScanner.scan(

            // success callback function
            function (result) {
                //https://45.media.tumblr.com/ff06c2c5c03293265f24d8721571eee4/tumblr_n6r8b62SJC1tbhzz6o1_400.gif
                $scope.imageURL = 'https://45.media.tumblr.com/ff06c2c5c03293265f24d8721571eee4/tumblr_n6r8b62SJC1tbhzz6o1_400.gif';
                $state.go('viewimage');
                // wrapping in a timeout so the dialog doesn't free the app
                //setTimeout(function() {
                //    alert("We got a barcode\n" +
                //          "Result: " + result.text + "\n" +
                //          "Format: " + result.format + "\n" +
                //          "Cancelled: " + result.cancelled);                            
                //}, 0);
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

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
