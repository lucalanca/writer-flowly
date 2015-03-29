'use strict';

import Editor from './editor.directive';
import EditorLineFocus from './editor-line-focus.directive';
import EditorStatistics from './editor-statistics/editor-statistics.directive';

angular
  .module('writer.editor', ['writer.common'])
  .directive('editor', Editor)
  .directive('editorLineFocus', EditorLineFocus)
  .directive('editorStatistics', EditorStatistics);
