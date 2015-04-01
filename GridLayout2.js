var React = require('react/addons')
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var _ = require('lodash')
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive
import QuandlGraph from './QuandlGraph.js'

var items = [
  {
    layout: { i: '0', x: 0, y: 0, w: 2, h: 2 },
    text: 'x'
  },
  {
    layout: { i: '1', x: 2, y: 0, w: 2, h: 2 },
    text: 'c'
  },
  {
    layout: { i: '2', x: 4, y: 0, w: 2, h: 3 },
    text: 'p'
  }
]

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
var AddRemoveLayout = React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 100
    }
  },

  getInitialState() {
    return {
      items: items,
      newCounter: items[items.length - 1]
    }
  },

  createElement(el) {
    var removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    }

    return (
      <div key={el.layout.i} _grid={el.layout}>
        <QuandlGraph height={el.layout.h * 100} />
        <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, el.layout.i)}>{el.text}</span>
      </div>
    )
  },

  onAddItem() {
    console.log('adding', 'n' + this.state.newCounter)
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: 'n' + this.state.newCounter,
        x: this.state.items.length * 2 % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    })
  },

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    })
  },

  onLayoutChange(layout) {
    this.setState(state => {
      return {
        items: state.items.map((item, i) => React.addons.update(item, { layout: { $set: layout[i] }}))
      }
    }, err => console.log(err, JSON.stringify(this.state.items)))
  },

  onRemoveItem(i) {
    console.log('removing', i)
    this.setState({ items: _.reject(this.state.items, { i: i }) })
  },

  render() {
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, this.createElement)}
        </ResponsiveReactGridLayout>
      </div>
    )
  }
})

module.exports = AddRemoveLayout