'use strict';

import Templates from './templates.directive';

angular
  .module('writer.templates', ['writer.common'])
  .directive('templates', Templates);
