'use strict';

import '../components/common/common.module';
import '../components/editor/editor.module';
import '../components/templates/templates.module';


import MainCtrl from './main/main.controller';
// import NavbarCtrl from '../components/navbar/navbar.controller';


angular
  .module('writer', [
    'writer.common',
    'writer.editor',
    'writer.templates'
  ])
  .controller('MainCtrl', MainCtrl)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');
  })
;
