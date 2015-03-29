'use strict';

function EditorLineFocus () {
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      var lineId = +attrs.editorLineFocus;

      scope.$on('editor.focus-line', (event, line, selectEnd) => {
        if (lineId === line) {
          element[0].focus();
          if (selectEnd) {
            var endIndex = element[0].value.length;
            element[0].selectionEnd = element[0].selectionStart = endIndex;
          }
        }
      });
    }
  };
}

export default EditorLineFocus;
