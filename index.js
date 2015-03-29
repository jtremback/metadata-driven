var React = require('react/addons')
// var _ = require('lodash')
var ReactD3 = require('react-d3-components')
var AreaChart = ReactD3.AreaChart
var update = React.addons.update
// var Chartist = require('react-chartist')

require('whatwg-fetch')

function parseQuandlTimeSeries (series) {
  return series
    .map((item) => { return { x: item[0], y: parseFloat(item[1])}})
    .sort((a, b) => a.x - b.x )
}

let Component1 = React.createClass({
  componentDidMount () {
    fetch('https://www.quandl.com/api/v1/datasets/OPEC/ORB.json?rows=23')
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            const values = parseQuandlTimeSeries(response.data)

            this.setState({data: {
              label: 'somethingA',
              // values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}],
              values: values
            }})

        });
  },
  render () {
    if (this.state) {
      return (
        <AreaChart
          data={ this.state.data }
          width={400}
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          interpolate={"basis"}
        />
      )
    } else {
      return <div>:(</div>
    }
  }
})

// var simpleLineChartData = {
//   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//   series: [
//     [12, 9, 7, 8, 5],
//     [2, 1, 3.5, 7, 3],
//     [1, 3, 4, 5, 6]
//   ]
// }

// let Component2 = React.createClass({
//   componentDidMount () {
//     fetch('https://www.quandl.com/api/v1/datasets/OPEC/ORB.json?rows=23')
//         .then((response) => {
//             if (response.status >= 400) {
//                 throw new Error("Bad response from server");
//             }
//             return response.json();
//         })
//         .then((response) => {
//             console.log(response);
//             const values = parseQuandlTimeSeries(response.data)

//             this.setState({data: {
//               label: 'somethingA',
//               // values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}],
//               values: values
//             }})

//         });
//   },
//   render () {
//     if (this.state) {
//       return <Chartist data={simpleLineChartData} type={'Line'} />
//     } else {
//       return <div>:(</div>
//     }
//   }
// })

window.onload = function () {
  React.render(<Component1 />, document.getElementById('container'));
}
