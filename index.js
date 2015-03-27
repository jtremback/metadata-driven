'use strict';

// Use
// var React = require('./react');
// instead if you are loading React externally, via a <script> element
var React = require('react')
var Kendo = require('react-kendo')

/**
 * Instead of, e.g.
 * $('#my-splitter').kendoSplitter(splitterOptions);
 *
 */

var splitterOptions = {
  orientation: 'horizontal',
  panes: [
    { collapsible: false, size: '300px' },
    { resizable: true }
  ]
};

var treeOptions = { /* ... */ }
var gridOptions = { /* ... */ }

var Workstation = React.createClass({
  render: function () {
    return (
      <Kendo.Splitter className="content" options={splitterOptions}>
        <Kendo.TreeView options={treeOptions} />
        <Kendo.Grid options={gridOptions} />
      </Kendo.Splitter>
    )
  }
})

React.render(<Workstation />, document.body)
