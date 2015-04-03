import React from 'react/addons'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Input from 'react-bootstrap/lib/Input'
import Portal from './Portal.js'
import Chartist from 'react-chartist'

class EditModal extends React.Component {
  constructor () {
    super()
    this.handleToggle = this.handleToggle.bind(this)
    this.renderInPortal = this.renderInPortal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      isModalOpen: false,
      rows: 10,
      code: 'OPEC/ORB'
    }
  }

  handleToggle () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    return (
      <div ref='jehan'>
        <Portal portalId={'foo'}>{this.renderInPortal()}</Portal>
        <Glyphicon className='launchEditModal' onClick={this.handleToggle} glyph='chevron-right' />
      </div>
    )
  }

  handleChange (ref) {
    return () => {
      this.setState({
        [ref]: this.refs[ref] ? this.refs[ref].getValue() : ''
      })
    }
  }

  renderInPortal() {
    if (!this.state.isModalOpen) {
      return <span/>
    }

    return (
      <Modal {...this.props} bsStyle='default' onRequestHide={this.handleToggle}>
        <div className='modal-body'>
          <Chartist data={this.props.data} options={{
            fullWidth: true,
            height: 300,
            chartPadding: {
              right: 40,
              top: 10
            }
          }} type={'Line'} />
          <form>
            <Input ref='rows' value={this.state.rows} type='number' label='Rows' onChange={this.handleChange('rows')} />
            <Input ref='code' value={this.state.code} type='select' label='Resource Code' onChange={this.handleChange('code')} >
              <option value='OPEC/ORB'>OPEC/ORB</option>
              <option value='BAVERAGE/ANX_HKUSD'>BAVERAGE/ANX_HKUSD</option>
            </Input>
          </form>
        </div>
      </Modal>
    )
  }
}

export default EditModal
