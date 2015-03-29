var React = require('react/addons')
// var _ = require('lodash')
var ReactD3 = require('react-d3-components')
var AreaChart = ReactD3.AreaChart
var update = React.addons.update

function parseBitstampOrderBook (series) {
  const series = series
    .map((item) => { return { x: parseFloat(item[0]), y: parseFloat(item[1])}})
    .sort((a, b) => a.x - b.x )
    .slice(1, 5)

  return series
}

// var data = [{
//     label: 'somethingA',
//     values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
// }];

// setTimeout(function () {
//   data[0].values[0].y = 23
// }, 2000)

// React.createClass()

// window.onload = function () {
//   React.render(<BarChart
//           data={this.state.data}
//           width={400}
//           height={400}
//           margin={{top: 10, bottom: 50, left: 50, right: 10}}/>,
//       document.getElementById('container')
//   );
// }


var pusher = new Pusher('de504dc5763aeef9ff52');
var orderBookChannel = pusher.subscribe('order_book');


let Counter = React.createClass({
  getDefaultProps () {
    return {
      initialData: [{
        label: '',
        values: [{x: 'SomethingA', y: 200}, {x: 'SomethingB', y: 300}, {x: 'SomethingC', y: 250}]
      }]
    }
  },
  getInitialState () {
    return {
      data: this.props.initialData,
      margin: { top: 10, bottom: 50, left: 50, right: 10 }
    }
  },
  componentDidMount () {
    orderBookChannel.bind('data', (data) => {
      this.tock(data)
    });
  },
  tock (result) {
    let series = parseBitstampOrderBook(result.bids)
    this.setState({ data: { 0: { values: series }}})
  },
  render () {
    return (
      <AreaChart
        data={ this.state.data }
        width={400}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}
        interpolate={"basis"}
      />
    );
  }
})

window.onload = function () {
  React.render(<Counter />, document.getElementById('container'));
}
