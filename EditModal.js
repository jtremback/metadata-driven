import React from 'react/addons'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import OverlayMixin from 'react-bootstrap/lib/OverlayMixin'

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

class EditModal extends React.Component {
  mixins: [OverlayMixin]

  constructor () {
    super()
    this.handleToggle = this.handleToggle.bind(this)
    this.renderOverlay = this.renderOverlay.bind(this)
    this.state = {
      isModalOpen: false
    }
  }

  handleToggle () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    return (
      <div>
        <Portal portalId={'foo'}>{this.renderOverlay()}</Portal>
        <Button onClick={this.handleToggle} bsStyle='primary'>Lancuh</Button>
      </div>
    )
  }

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>
    }

    return (
      <Modal bsStyle='primary' title='Modal heading' onRequestHide={this.handleToggle}>
        <div className='modal-body'>
          This modal is controlled by our custom trigger component.
        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    )
  }
}

export default EditModal
