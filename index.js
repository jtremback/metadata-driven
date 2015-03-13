'use strict';

// Use
// var React = require('./react');
// instead if you are loading React externally, via a <script> element
var React = require('react');

var App = React.createClass({
  render: function() {
    return <h3>goodbyewassadfasdfa World!</h3>;
  }
});

React.renderComponent(<App />, document.body);