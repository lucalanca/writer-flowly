'use strict';

class TemplatesCtrl {
  constructor () {
    this.templates = [
      {
        name: 'Weekly Short Meeting',
        lines: [{'number':1,'content':'# Weekly Short Meeting','type':1},{'number':2,'content':'## News','type':2},{'number':3,'content':'-'},{'number':4,'content':'### Ginetta Team','type':3},{'number':5,'content':'-'},{'number':6,'content':'### Ginetta Internal','type':3},{'number':7,'content':'-'},{'number':8,'content':'### Acquisition','type':3},{'number':9,'content':'-'},{'number':10,'content':'### Varia','type':3},{'number':11,'content':'-'},{'number':12,'content':'## Projects','type':2},{'number':13,'content':'-'},{'number':14,'content':'## Events','type':2},{'number':15,'content':'-'},{'number':16,'content':'## Challenges','type':2},{'number':17,'content':'-'},{'number':18,'content':'## What we learned','type':2},{'number':19,'content':'-'}]
      },
      {
        name: 'Business Plan Template',
        lines: [{'number':1,'content':'# Business Plan Template','type':1},{'number':2,'content':'## Executive Summary','type':2,'childrenCollapsed':false},{'number':3,'content':'Write this section last.','collasped':false},{'number':4,'content':'Explain the fundamentals of the proposed business: What will your product be? Who will your customers be? Who are the owners? What do you think the future holds your business and your industry?','collasped':false},{'number':5,'content':'Make it enthusiastic, professional, complete, and concise.','collasped':false},{'number':6,'content':'## General Company Description','type':2,'childrenCollapsed':false},{'number':7,'content':'What business will you be in? What will you do?','collasped':false},{'number':8,'content':'### Mission Statement','type':3,'collasped':false},{'number':9,'content':'Many companies have a brief mission statement, usually in 30 words or fewer, explaining their reason for being and their guiding principles. If you want to draft a mission statement, this is a good place to put in in the plan, followed by:','collasped':false},{'number':10,'content':'### Company Goals and Objectives','type':3,'collasped':false},{'number':11,'content':'Goals are destinations — where you want your business to be. Objectives are progress markers along the way to goal achievement. For example a goal might be to have a healthy, sucessful company that is a leader in customer service and that has a loyal customer following. Objectives might be annual sales targets and some specific measures of customer satisfaction.','collasped':false},{'number':12,'content':'### Business Philosophy','type':3,'collasped':false},{'number':13,'content':'What is important to you in business?','collasped':false},{'number':14,'content':'To whom will you market your products? (State it briefly here — you will do a more thorough explanation in the Marketing Plan section)','collasped':false},{'number':15,'content':'Describe your industry. Is it a growth industry? What changes do you foresee in the industry, short term and long term? How will your company be poised to take advantage of them?','collasped':false},{'number':16,'content':'','collasped':false},{'number':17,'content':'## Products and Services','type':2},{'number':18,'content':'## Marketing Plan','type':2},{'number':19,'content':'## Operational Plan','type':2},{'number':20,'content':'## Management and Organization'},{'number':21,'content':'## Personal Financial Statement','type':2},{'number':22,'content':'## Startup Expenses and Capitalizatoin','type':2},{'number':23,'content':'## Financial Plan','type':2},{'number':24,'content':''},{'number':25,'content':''}]
      },
      {
        name: 'Life',
        lines: [{'number':1,'content':'# TODO','type':1},{'number':2,'content':'## Now','type':2},{'number':3,'content':'## Today','type':2},{'number':4,'content':'## This Week','type':2},{'number':5,'content':'# Projects','type':1},{'number':6,'content':'## Blue Evidence','type':2},{'number':7,'content':'## Basler & Hofmman','type':2},{'number':8,'content':'# Developement','type':1},{'number':9,'content':'## Mind','type':2},{'number':10,'content':'## Fitness','type':2},{'number':11,'content':'## Social','type':2},{'number':12,'content':'## Travel','type':2},{'number':13,'content':'# Ideas','type':1},{'number':14,'content':'# Reading','type':1},{'number':15,'content':''}]
      }
    ];
  }

  selectTemplate (template) {
    this.isShown = false;
    this.editorCtrl.addTemplate(template);
  }
}

// TemplatesCtrl.$inject = [];


function Templates () {
  return {
    restrict: 'E',
    templateUrl: 'components/templates/templates.html',
    controller: TemplatesCtrl,
    controllerAs: 'templates',
    bindToController: true,
    require: '^editor',
    link: (scope, element, attrs, editorCtrl) => {
      scope.templates.editorCtrl = editorCtrl;
    },
    scope: {
      isShown: '='
    }
  };
}

export default Templates;
