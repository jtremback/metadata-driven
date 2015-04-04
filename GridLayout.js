var React = require('react/addons')
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var _ = require('lodash')
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive
import QuandlGraph from './QuandlGraph.js'
import Panel from 'react-bootstrap/lib/Panel'

const rowHeight = 200

class GridLayout extends React.Component {
  // mixins: [ PureRenderMixin ]

  constructor () {
    super()
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onAddItem = this.onAddItem.bind(this)
    this.createElement = this.createElement.bind(this)
    this.onRemoveItem = this.onRemoveItem.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
    this.state = {
      items: [],
      api: { code: 'OPEC/ORB', rows: 10 }
    }

    setTimeout(() => { this.setState({ api: { code: 'OPEC/ORB', rows: 4 }}) }, 1000)
    setTimeout(() => { this.setState({ api: { code: 'OPEC/ORB', rows: 20 }}) }, 2000)
  }

  createElement (el) {
    return (
      <Panel key={el.layout.i} _grid={el.layout}>
        <QuandlGraph height={el.layout.h * rowHeight - 50} api={this.state.api}/>
        <span className="remove"
          onClick={this.onRemoveItem.bind(this, el.layout.i)}
        >{el.text}</span>
      </Panel>
    )
  }

  onAddItem () {
    var newItem = {
      text: 'n',
      layout: {
        i: Math.floor(Math.random() * 1e15),
        x: this.state.items.length * 2 % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }
    }

    this.setState(React.addons.update(this.state, {
      items: { $push: [newItem] }
    }))
  }

  componentDidMount () {
    var ls = {}
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem('metadata-driven')) || {}
      } catch(e) {}
    }
    this.setState({ items: ls.items || [] })
  }

  saveToLocalStorage () {
    if (global.localStorage) {
      global.localStorage.setItem('metadata-driven', JSON.stringify({
        items: this.state.items
      }))
    }
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange (breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    })
  }

  onLayoutChange (layout) {
    let items = this.state.items.map((item, i) => React.addons.update(item, { layout: { $set: layout[i] }}))
    this.setState({
      items: items
    })
  }

  onRemoveItem (i) {
    this.setState({ items: _.reject(this.state.items, { i: i }) })
  }

  render () {
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <button onClick={this.saveToLocalStorage}>Save to Local Storage</button>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          { _.map(this.state.items, this.createElement) }
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

GridLayout.defaultProps = {
  className: 'layout',
  cols: { lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 },
  rowHeight: rowHeight
}

export default GridLayout