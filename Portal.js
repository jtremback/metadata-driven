import React from 'react'

var Portal = React.createClass({
  render: () => null,
  portalElement: null,
  componentDidMount() {
    var p = this.props.portalId && document.getElementById(this.props.portalId);
    if (!p) {
      var p = document.createElement('div');
      p.id = this.props.portalId;
      document.body.appendChild(p);
    }
    this.portalElement = p;
    this.componentDidUpdate();
  },
  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  },
  componentDidUpdate() {
    React.render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
  }
});

module.exports = Portal