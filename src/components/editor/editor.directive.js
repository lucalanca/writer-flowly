'use strict';

class EditorCtrl {

  constructor ($scope, $timeout, hotkeys) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.hotkeys = hotkeys;
    this.activeLineNumber = 1;
    this.lines = [
      { number: 1, content: ''}
    ];
    var me = this;

    this.hotkeys.bindTo(this.$scope)
      .add({
        combo: 'ctrl+t',
        allowIn: ['TEXTAREA'],
        description: 'Toggle Section',
        callback: function () {
          me.toggle();
        }
      })
      .add({
        combo: 'enter',
        allowIn: ['TEXTAREA'],
        description: 'New Line',
        callback: function (event) {
          event.preventDefault(); // default behaviour adds a new line to the content.
          me.addLine();
          me.focusNextLine();
        }
      })
      .add({
        combo: 'down',
        allowIn: ['TEXTAREA'],
        description: 'Next Line',
        callback: function () {
          me.focusNextLine();
        }
      })
      .add({
        combo: 'up',
        allowIn: ['TEXTAREA'],
        description: 'Previous Line',
        callback: function () {
          if (me.activeLineNumber > 1) {
            me.focusPreviousLine();
          }
        }
      })
      .add({
        combo: 'backspace',
        allowIn: ['TEXTAREA'],
        description: 'Delete line, if empty',
        callback: function () {
          if (me.isActiveLineEmpty()) {
            me.removeLine();
            me.focusPreviousLine();
          }
        }
      })
      .add({
        combo: 'tab',
        allowIn: ['TEXTAREA'],
        description: 'Indent line',
        callback: function (event) {
          event.preventDefault();// default is jumping to next line
          me.indentLine();
        }
      })
      .add({
        combo: 'shift+tab',
        allowIn: ['TEXTAREA'],
        description: 'Unindent line',
        callback: function (event) {
          event.preventDefault(); // default is jumping to previous line
          me.unindentLine();
        }
      });
  }

  indentLine () {
    var line = this.lines[this.activeLineNumber - 1];
    if (line.content.startsWith('#')) {
      line.content = '#' + line.content;
    } else {
      line.content = '# ' + line.content;
    }
  }

  unindentLine () {
    var line = this.lines[this.activeLineNumber - 1];
    if (!line.content.startsWith('#')) {
      return;
    }

    line.content = line.content.slice(1).trimLeft();
  }

  isActiveLineEmpty () {
    return this.lines[this.activeLineNumber - 1].content === '';
  }

  addLine () {
    var newLineNumber = this.getNextUncollapsedLineNumber();

    this.lines.splice(
      newLineNumber - 1,
      0,
      { number: newLineNumber, content: '' }
    );
    for (var i = newLineNumber; i < this.lines.length; i++) {
      this.lines[i].number = i + 1;
    }
  }

  removeLine () {
    this.lines.splice(this.activeLineNumber - 1, 1);
    for (var i = this.activeLineNumber - 1; i < this.lines.length; i++) {
      this.lines[i].number = i+1;
    }
  }

  updateActiveLineNumber (lineNumber) {
    this.activeLineNumber = lineNumber;
  }

  getNextUncollapsedLineNumber () {
    for (var i = this.activeLineNumber; i < this.lines.length; i++) {
      var currentLine = this.lines[i];
      if (!currentLine.collasped) {
        return currentLine.number;
      }
    }
    return this.activeLineNumber + 1;
  }

  getPreviousUncollapsedLineNumber () {
    for (var i = this.activeLineNumber - 2; i >= 0; i--) {
      var currentLine = this.lines[i];
      if (!currentLine.collasped) {
        return currentLine.number;
      }
    }
  }

  focusPreviousLine () {
    var previousUncollapsedLineNumber = this.getPreviousUncollapsedLineNumber();
    this.focusLine(previousUncollapsedLineNumber);
  }

  focusNextLine () {
    if (this.lines.length < this.activeLineNumber + 1) {
      this.addLine();
    }
    var nextUncollapsedLineNumber = this.getNextUncollapsedLineNumber();
    this.focusLine(nextUncollapsedLineNumber);
  }

  focusLine (line) {
    this.$timeout( function () {
      var selectEnd = this.lines[line - 1].content !== '';
      this.$scope.$broadcast('editor.focus-line', line, selectEnd);
    }.bind(this));
  }

  parseActiveLine () {
    var line = this.lines[this.activeLineNumber - 1];
    var content = line.content;
    if (content.startsWith('#####')) {
      line.type = 5;
    } else if (content.startsWith('####')) {
      line.type = 4;
    } else if (content.startsWith('###')) {
      line.type = 3;
    } else if (content.startsWith('##')) {
      line.type = 2;
    } else if (content.startsWith('#')) {
      line.type = 1;
    }
  }

  isLineCollapsable () {
    var line = this.lines[this.activeLineNumber - 1];

    if (!line.type) {
      return false;
    }

    if (line.number === this.lines.length - 1) {
      return false;
    }

    var nextLine = this.lines[line.number];

    if (!nextLine.type) {
      return true;
    }

    if (nextLine.type <= line.type) {
      return false;
    }
    return true;
  }

  toggle () {
    var line = this.lines[this.activeLineNumber - 1];

    if (!line.type) {
      return;
    }

    if (!this.isLineCollapsable()) {
      return;
    }

    if (!line.childrenCollapsed) {
      line.childrenCollapsed = true;
    } else {
      line.childrenCollapsed = false;
    }

    for (var i = line.number; i < this.lines.length; i++) {
      var currentLine = this.lines[i];

      if (!currentLine.type || currentLine.type > line.type) {
        currentLine.collasped = line.childrenCollapsed;
      } else if (currentLine.type && currentLine.type <= line.type) {
        break;
      }
    }
  }

  toggleTemplates () {
    this.templatesDrawerOpened = !this.templatesDrawerOpened;
  }

  addTemplate (template) {
    this.lines = template.lines;
  }


}

EditorCtrl.$inject = ['$scope', '$timeout', 'hotkeys'];

function Editor () {
  return {
    restrict: 'E',
    controller: EditorCtrl,
    controllerAs: 'editor',
    templateUrl: 'components/editor/editor.html',
    bindToController: true,
    scope: {
      lines: '='
    }
  };
}

export default Editor;
