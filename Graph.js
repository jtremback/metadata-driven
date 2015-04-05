import React from 'react'
import GraphView from './GraphView.js'
import EditModal from './EditModal.js'

class Graph extends React.Component {
  render () {
    return (
      <div className='graph'>
        <EditModal {...this.props}/>
        <GraphView {...this.props}/>
      </div>
    )
  }
}

export default Graph
