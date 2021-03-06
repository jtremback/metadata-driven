import React from 'react/addons'
import GraphView from './GraphView.js'
import Button from 'react-bootstrap/lib/Button'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Modal from 'react-bootstrap/lib/Modal'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Input from 'react-bootstrap/lib/Input'
import Portal from './Portal.js'
import Chartist from 'react-chartist'
import wsj from './wsj.js'

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
      this.setState({
        params: React.addons.update(this.state.params, {
          [ref]: { $set: this.refs[ref] && this.refs[ref].getValue() }
        })
      })
    }
  }

  saveChanges () {
    this.props.settingsDidChange(this.state && this.state.params)
    this.handleToggle()
  }

  renderInPortal () {
    if (this.state.isModalOpen && this.state.params) {
      return (
        <Modal {...this.props} bsStyle='default' onRequestHide={this.handleToggle}>
          <div className='modal-body'>
            <GraphView params={this.state.params} height={300}/>
            <form>
              <Input
                ref='rows'
                value={this.state.params.rows}
                bsStyle={(this.state.params.rows > 1) ?
                  '' : 'error'
                }
                type='number'
                label='Days Back'
                onChange={this.handleChange('rows')}
              />
              <Input
                ref='code'
                value={this.state.params.code}
                onChange={this.handleChange('code')}
                type='select'
                label='Resource Code'
              >
                {wsj.map(item => <option value={item.value}>{item.label}</option>)}
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

              // <Input
              //   ref='rows'
              //   value={this.state.params.rows}
              //   bsStyle={(this.state.params.rows > 1) ?
              //     '' : 'error'
              //   }
              //   type='number'
              //   label='Rows'
              //   onChange={this.handleChange('rows')}
              // />

              // <Input wrapperClassName='wrapper'>
              //   <Row>
              //     <Col xs={6}>
              //       <Input
              //         ref='from'
              //         value={this.state.params.from}
              //         onChange={this.handleChange('from')}
              //         label='From'
              //         type='date'
              //       />
              //     </Col>
              //     <Col xs={6}>
              //       <Input
              //         ref='till'
              //         value={this.state.params.till}
              //         onChange={this.handleChange('till')}
              //         label='Till'
              //         type='date'
              //       />
              //     </Col>
              //   </Row>
              // </Input>
