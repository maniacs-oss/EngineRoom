import { moduleForComponent, test } from "ember-qunit";
import stackedAreaChartFixture from "../fixtures/stacked-area-chart-fixture";


moduleForComponent("stacked-area-chart", "StackedAreaChartComponent", {
  needs: [],
  setup: function() {
    var fixture = stackedAreaChartFixture();

    this.subject().set("data", fixture);
  },
  tearDown: function() {
    //
  }
});

test("it renders", function() {
  var component = this.subject();
  equal(component._state, "preRender");
  this.render();

  equal(component._state, "inDOM");
});

test("it sizes the svg based on div size and margin options", function() {
  var component = this.subject();
  this.render();

  var svg = component.$().find("svg");

  ok(svg, "draws the svg");

  var chartDiv = component.$().find(".chart");

  var expectedSvgWidth = chartDiv.width();
  //var expectedSvgWidth = chartDiv.width() - margin.right;
  var expectedSvgHeight = component.get("chartDivHeight");

  equal(svg.width(), expectedSvgWidth, "width");
  equal(svg.height(), expectedSvgHeight, "height");
});

test("it draws axes", function() {
  var component = this.subject();
  this.render();

  var svg = component.$().find("svg");
  var xAxis = svg.find(".x");
  var yAxis = svg.find(".y");

  ok(xAxis);
  ok(yAxis);
});

test("it writes a chart title", function() {
  var component = this.subject();
  this.render();

  var title = component.$().find(".chart-title");

  var expectedTitle = component.get("titleString");

  equal(title.text(), expectedTitle);
});

test("it draws stacked areas", function() {
  var component = this.subject();  
  this.render();

  var processedData = component.get("data").processed;

  var svg = component.$().find("svg");
  var groups = svg.find(".group");

  var expectedGroupN = processedData.length;
  equal(groups.length, expectedGroupN, "right number of groups");

  var path = groups.find("path");

  equal(path.length, expectedGroupN, "right number of paths");

  // TODO: test properties of the paths themselves?
});

test("it draws a legend", function() {
  var component = this.subject();  
  this.render();

  var processedData = component.get("data").processed;

  var svg = component.$().find("svg");
  var legendEntries = svg.find(".legend");

  var expectedLegendEntryN = processedData.length;
  equal(legendEntries.length, expectedLegendEntryN);

  // TODO: check for rects, labels, truncation

});