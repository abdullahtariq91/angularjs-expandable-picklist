/**
 * button will return array
 * variables:
 * 1. array of data to show only
 * 2. array of headings = [{alias, name, width}]
 *    (will display alias as headings only)
 * 3. prefix for div ids
 *
 * requirements:
 * 1. both arrays should be preformatted
 * 2. both arrays should have same order
 *    (array of data's object values should be in same order as array of headings' alias)
 */

var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', '$log', '$location', '$anchorScroll', function ($scope, $http, $log, $location, $anchorScroll) {
  $scope.sample = [
  	{
  		color: "1red",
  		value: "#f00",
      more: [{
        morecolor: "moreRed",
        value: "afsaf"
      }, {
        morecolor: "safsaf",
        value: "asf"
      }, {
        morecolor: "sadsadsada",
        value: "sadsadsa"
      }, {
        morecolor: "2131231",
        value:"wr1r1"
      }
      ]
  	},
  	{
  		color: "gran",
  		value: "#0f0",
      more: [{
        morecolor: "moresadRed",
        value: "af34saf"
      }]
  	},
  	{
  		color: "blue",
  		value: "#00f",
      more: [{
        morecolor: "m42reed",
        value: "afsa41f"
      }]
  	},
  	{
  		color: "cyan",
  		value: "#0ff",
      more: [{
        morecolor: "mo124ed",
        value: "2144"
      }, {
        morecolor: "124124",
        value: "ubcsafasafsoi7"
      }]
  	},
  	{
  		color: "sase",
  		value: "#f0f",
      more: [{
        morecolor: "213",
        value: "afsfsaaf"
      }]
  	},
  	{
  		color: "yellow",
  		value: "#ff0",
      more: [{
        morecolor: "213123",
        value: "afsaasdf"
      }]
  	},
  	{
  		color: "11alack",
  		value: "#000",
      more: [{
        morecolor: "1234",
        value: "1234"
      }, {
        morecolor: "9876",
        value: "9876"
      }]
  	},
    {
      color: "red",
      value: "#f00",
      more: [{
        morecolor: "sadasded",
        value: "afs214142f"
      }]
    },
    {
      color: "green",
      value: "#0f0",
      more: [{
        morecolor: "more214Red",
        value: "afs14af"
      }]
    },
    {
      color: "blue",
      value: "#00f",
      more: [{
        morecolor: "moreR1244ed",
        value: "a124af"
      }]
    },
    {
      color: "cyan",
      value: "#0ff",
      more: [{
        morecolor: "mor241eRed",
        value: "af214saf"
      }]
    },
    {
      color: "sade",
      value: "#f0f",
      more: [{
        morecolor: "12424kreRed",
        value: "142fsaf"
      }, {
        morecolor: "asgs",
        value: "521"
      }]
    },
    {
      color: "yellow",
      value: "#ff0",
      more: [{
        morecolor: "askfjkls",
        value: "safsafsa"
      }, {
        morecolor: "afs1t",
        value: "ubcsoi7"
      }]
    }
  ];


  $scope.headings = [];
  $scope.headings.push({'alias': 'BIG COLOR', 'name': 'color', 'width': 50});
  $scope.headings.push({'alias': 'BIG VALUE', 'name': 'value', 'width': 50});

  $scope.expandableHeadings =[];
  $scope.expandableHeadings.push({'alias': 'More Color', 'name': 'morecolor', 'width': 50});
  $scope.expandableHeadings.push({'alias': 'More Value', 'name': 'value', 'width': 50});
  $scope.expandableHeading = 'more';
  $scope.expandList = false;
  $scope.expandedLists = [];
  $scope.expandableCount = 0;
  $scope.expandedClickOutput = [];

  $scope.prefix = 'div';

  for (var i = 0; i < $scope.sample.length; i++) {
    $scope.sample[i].selected = 'not selected';
    $scope.sample[i].searched = 'not searched';
    $scope.sample[i].show = false;
    $scope.sample[i].filtered = 'shown';
    $scope.sample[i].searchid = i;
    
    for (var j = 0; j < $scope.sample[i][$scope.expandableHeading].length; j++) {
      $scope.sample[i][$scope.expandableHeading][j].selected = 'not selected';
      $scope.sample[i][$scope.expandableHeading][j].parentid = i;
      $scope.sample[i][$scope.expandableHeading][j].itemid = j;
    }
  }

  $scope.sampleHeadings = 0;
  $scope.singleClickOutput = [];
  $scope.selected = 'no-highlight';
  $scope.propertyName = $scope.headings[0].name;
  $scope.reverse = true;  
  $scope.enterPressed = 0;
  $scope.results = [];

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName.name) ? !$scope.reverse : false;
    $scope.propertyName = propertyName.name;
  };

  $scope.sortBy('color');

  $scope.doubleClick = function(index) {
    $scope.doubleClickOutput = item;
    $scope.expandList = !$scope.expandList;
  };

  for (var key in $scope.sample[0]) {
    $scope.sampleHeadings++;
  }

  for (var key in $scope.expandableHeadings[0]) {
    $scope.expandableCount++;
  }

  $scope.searchHeading = function(heading, searchFilter) {
    if (searchFilter !== '') {
      for (var i = 0; i < $scope.sample.length; i++) {
        $scope.sample[i].searched = 'not searched';
        $scope.sample[i].filtered = 'hidden';
        if ($scope.sample[i][heading].includes(searchFilter)) {
          $scope.sample[i].searched = 'searched';
          $scope.sample[i].filtered = 'shown';
        }
      }
    } else {
      for (var i = 0; i < $scope.sample.length; i++) {
        $scope.sample[i].searched = 'not searched';
        $scope.sample[i].filtered = 'shown';
      }
    }
    $scope.searchHeadingOutput = heading;
  };
  
  $scope.singleClick = function(item) {
    var alreadyExists = false;
    var expandedItem = {};
    var expandedItems = [];
    for (var i = 0; i < item[$scope.expandableHeading].length; i++) {
      expandedItem = {};
      for (var key in item) {
        if (key !== $scope.expandableHeading) {
          expandedItem[key] = item[key];
        }
      }

      for (var property in item[$scope.expandableHeading][i]) {
        expandedItem[property] = item[$scope.expandableHeading][i][property];
      }
      expandedItems.push(expandedItem);
    }

    if (item.selected === 'selected') {
      for (var j = 0; j < expandedItems.length; j++) {
        for (var k = 0; k < $scope.expandedClickOutput.length; k++) {
          if ($scope.expandedClickOutput[k].parentid === expandedItems[j].parentid && $scope.expandedClickOutput[k].itemid === expandedItems[j].itemid) {
            $scope.expandedClickOutput.splice(k, 1);
          }
        }
        $scope.sample[expandedItems[j].parentid][$scope.expandableHeading][expandedItems[j].itemid].selected = 'not selected';
        $scope.sample[expandedItems[j].parentid].selected = 'not selected';
      }
    } else {
      for (var j = 0; j < expandedItems.length; j++) {
        alreadyExists = false;
        for (var k = 0; k < $scope.expandedClickOutput.length; k++) {
          if ($scope.expandedClickOutput[k].parentid === expandedItems[j].parentid && $scope.expandedClickOutput[k].itemid === expandedItems[j].itemid) {
            alreadyExists = true;
          }
        }
        if (!alreadyExists) {
          $scope.expandedClickOutput.push(expandedItems[j]);
        }
        $scope.sample[expandedItems[j].parentid][$scope.expandableHeading][expandedItems[j].itemid].selected = 'selected';
        $scope.sample[expandedItems[j].parentid].selected = 'selected';
      }
    }
  };

  $scope.singleClickExpanded = function(subItem, item) {
    var alreadyExists = false;
    var expandedItem = {};
    for (var key in item) {
      if (key !== $scope.expandableHeading) {
        expandedItem[key] = item[key];
      }
    }
    for (key in subItem) {
      expandedItem[key] = subItem[key]
    }
    for (var i = 0; i < $scope.expandedClickOutput.length; i++) {
      if ($scope.expandedClickOutput[i].itemid === expandedItem.itemid && $scope.expandedClickOutput[i].parentid === expandedItem.parentid) {
        alreadyExists = true;
        subItem.selected = 'not selected';
        item.selected = 'not selected';
        $scope.expandedClickOutput.splice(i, 1);
      }
    }
    if (!alreadyExists) {
      subItem.selected = 'selected';
      var count = 0;
      for (var j = 0; j < $scope.sample[expandedItem.parentid][$scope.expandableHeading].length; j++) {
        if ($scope.sample[expandedItem.parentid][$scope.expandableHeading][j].selected === 'selected') {
          count++;
        }
      }
      if (count === $scope.sample[expandedItem.parentid][$scope.expandableHeading].length) {
        $scope.sample[expandedItem.parentid].selected = 'selected';
      }
      $scope.expandedClickOutput.push(expandedItem);
    }
  };

  $scope.jumpSearch = function() {
    if ($scope.enterPressed + 1 < $scope.results.length) {
      var main_columns = document.getElementById('main-columns');
      main_columns.scrollTop = 0;
      var prefixno = document.getElementById('' + $scope.prefix + $scope.results[$scope.enterPressed]);
      main_columns.scrollTop = main_columns.scrollTop + prefixno.offsetTop;
      $scope.enterPressed++;
    } else {
      $scope.enterPressed = 0;
    }
  };

  $scope.searchItems = function() {
    $scope.enterPressed = 0;
    $scope.results = [];
    var main_columns = document.getElementById('main-columns');
    main_columns.scrollTop = 0;
    if ($scope.searchItem !== '') {
      for (var i = 0; i < $scope.sample.length; i++) {
        $scope.sample[i].searched = 'not searched';
        for (var keys in $scope.sample[i]) {
          if (keys !== 'selected' && keys !== 'searched' && keys !== '$$hashKey' && keys !== 'searchid' && keys !== 'filtered' && keys !== $scope.expandableHeading && keys !== 'show') {
            if ($scope.sample[i][keys].includes($scope.searchItem)) {
              $scope.sample[i].searched = 'searched';
              $scope.results.push(i);
            }
          }
        }
      }
    } else {
      main_columns.scrollTop = 0;
      for (var i = 0; i < $scope.sample.length; i++) {
        $scope.sample[i].searched = 'not searched';
      }
    }
  };
}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
              scope.$apply(function (){
                  scope.$eval(attrs.ngEnter);
              });
              event.preventDefault();
            }
        });
    };
});