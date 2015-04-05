import React from 'react/addons'
import GraphView from './GraphView.js'
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
    this.saveChanges = this.saveChanges.bind(this)
    this.state = {
      isModalOpen: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ params: nextProps.params })
  }

  handleToggle () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render () {
    return (
      <div ref='jehan'>
        <Portal portalId={'foo'}>{this.renderInPortal()}</Portal>
        <Glyphicon className='launchEditModal' onClick={this.handleToggle} glyph='cog' />
      </div>
    )
  }

  handleChange (ref) {
    return () => {
      let params = React.addons.update(this.state.params, {
        [ref]: { $set: this.refs[ref] ? this.refs[ref].getValue() : '' }
      })
      this.setState({
        params: params
      })
    }
  }

  saveChanges () {
    this.props.settingsDidChange(this.state)
  }

  renderInPortal () {
    if (this.state.isModalOpen && this.state.params) {
      return (
        <Modal {...this.props} bsStyle='default' onRequestHide={this.handleToggle}>
          <div className='modal-body'>
            <GraphView params={this.state.params}/>
            <form>
              <Input ref='rows' value={this.state.params.rows} type='number' label='Rows' onChange={this.handleChange('rows')} />
              <Input ref='code' value={this.state.params.code} type='select' label='Resource Code' onChange={this.handleChange('code')} >
                <option value='OPEC/ORB'>OPEC/ORB</option>
                <option value='BAVERAGE/ANX_HKUSD'>BAVERAGE/ANX_HKUSD</option>
              </Input>
              <Button onClick={this.saveChanges}>Save</Button>
            </form>
          </div>
        </Modal>
      )
    } else {
      return <span/>
    }

  }
}

export default EditModal
