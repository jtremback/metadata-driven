var React = require('react/addons')
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var _ = require('lodash')
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive
import QuandlGraph from './QuandlGraph.js'


class GridLayout extends React.Component {
  mixins: [ PureRenderMixin ]

  constructor () {
    super()
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onAddItem = this.onAddItem.bind(this)
    this.createElement = this.createElement.bind(this)
    this.onRemoveItem = this.onRemoveItem.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
    this.state = {
      items: []
    }
  }

  createElement (el) {
    var removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    }

    return (
      <div key={el.layout.i} _grid={el.layout}>
        <QuandlGraph height={el.layout.h * 100} />
        <span className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, el.layout.i)}
        >{el.text}</span>
      </div>
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
    // debugger
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
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100
}

module.exports = GridLayout