/**
 * @ngdoc function
 * @name mesUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mesUiApp
 */
angular.module('mesUiApp')
  .controller('MainCtrl', function ($scope, MachineService) {
    $scope.obj = {
      articles: [],
      models: [],
      params: [],
      searchArticles: '',
      currentParams: {},
      machineState: 0,
      isMobile: window.innerWidth < 768
    };

    $scope.getAllArticles = function () {
      MachineService.getAllArticles().then(function (articles) {
        $scope.obj.articles = articles;
      }, function (reason) {
        console.error(reason);
      });
    };

    $scope.getAllModels = function () {
      MachineService.getAllModels().then(function (models) {
        $scope.obj.models = models;
      }, function (reason) {
        console.error(reason);
      });
    };

    $scope.getAllParams = function () {
      MachineService.getAllParams().then(function (params) {
        $scope.obj.params = params;
        for (var p in params) {
          $scope.obj.currentParams[params[p].code] = '';
        }
      }, function (reason) {
        console.error(reason);
        $scope.obj.machineState = 0;
      });
    };

    $scope.getParam = function (code) {
      MachineService.getParam(code).then(function (paramVal) {
        $scope.obj.currentParams[code] = paramVal[0].trim();
        $scope.obj.machineState = 1;
      }, function (reason) {
        console.error(reason);
        $scope.obj.machineState = 0;
      });
    };

    $scope.setParam = function (artCode, artAmount) {
      // set print code
      MachineService.setParam({
        code: configs.TAG_COD_PRINT,
        value: artCode
      }).then(function (result) {
        console.log(configs.TAG_COD_NUM, "OK");
      }, function (reason) {
        console.error(reason);
      });

      // set c1
      MachineService.setParam({
        code: configs.TAG_COD_NUM,
        value: artAmount
      }).then(function (result) {
        console.log(configs.TAG_COD_NUM, "OK");
      }, function (reason) {
        console.error(reason);
      });
    };

    $scope.getAllArticles();
    $scope.getAllParams();

    // polling machine
    setInterval(function () {
      for (var p in $scope.obj.currentParams) {
        $scope.getParam(p);
      }
    }, configs.POLLING_INTERVAL + Math.floor(Math.random() * 1000));

  });
