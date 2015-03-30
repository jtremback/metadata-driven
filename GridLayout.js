import React from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
import ReactGridLayout from 'react-grid-layout'
import QuandlGraph from './QuandlGraph.js'

/**
 * This layout demonstrates how to sync to localstorage.
 */
class GridLayout extends React.Component {
  constructor () {
    super()
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  mixins: [PureRenderMixin]

  getDefaultProps () {
    return {
      className: 'layout',
      cols: 12,
      rowHeight: 30
    }
  }

  componentDidMount () {
    var ls = {}
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem('rgl-7')) || {}
      } catch(e) {}
    }
    this.setState({layout: ls.layout || []})
  }

  componentDidUpdate () {
    this.saveToLocalStorage()
  }

  resetLayout () {
    this.setState({layout: []})
  }

  saveToLocalStorage () {
    if (global.localStorage) {
      global.localStorage.setItem('rgl-7', JSON.stringify({
        layout: this.state.layout
      }))
    }
  }

  onLayoutChange (layout) {
    console.log('layout changed', layout)
    // this.props.onLayoutChange(layout) // updates status display
    this.setState({ layout: layout })
  }

  render () {
    if (this.state) {
      return (
        <div>
          <button onClick={this.resetLayout}>Reset Layout</button>
          <ReactGridLayout
              {...this.props}
              rowHeight={200}
              isDraggable={true}
              isResizable={true}
              cols={4}
              useCSSTransforms={true}
              layout={this.state.layout}
              onLayoutChange={this.onLayoutChange}>
            <div key={1} _grid={{w: 1, h: 1, x: 0, y: 0}}><QuandlGraph height={200} /></div>
            <div key={2} _grid={{w: 1, h: 1, x: 2, y: 0}}><span className='text'>2</span></div>
            <div key={3} _grid={{w: 1, h: 1, x: 4, y: 0}}><span className='text'>3</span></div>
            <div key={4} _grid={{w: 1, h: 1, x: 6, y: 0}}><span className='text'>4</span></div>
            <div key={5} _grid={{w: 1, h: 1, x: 8, y: 0}}><span className='text'>5</span></div>
          </ReactGridLayout>
        </div>
      )
    } else {
      return <div>:(</div>
    }
  }
}

export default GridLayout