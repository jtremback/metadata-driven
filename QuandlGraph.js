import React from 'react'
import _ from 'lodash'
import Chartist from 'react-chartist'
import 'whatwg-fetch'

function parseQuandlTimeSeries (input) {
  let output = {
    labels: [],
    series: [[]]
  }

  input.forEach((a) => {
    output.labels.unshift(a[0])
    output.series[0].unshift(a[1])
  })

  return (output)
}

class QuandlGraph extends React.Component {

  componentDidMount () {
    fetch(
      'https://www.quandl.com/api/v1/datasets/OPEC/ORB.json?rows=10&auth_token=3XJzrsSsLc8rzfxvwhFM'
    )
    .then((response) => {
        if (response.status >= 400) {
            throw new Error(`Bad response from server`)
        }
        return response.json()
    })
    .then((response) => {
      const values = parseQuandlTimeSeries(response.data)

      this.setState({ data: values, height: 400 })
    })

  }

  render () {
    if (this.state) {
      return (
        <Chartist data={this.state.data} options={{
          fullWidth: true,
          height: this.props.height,
          chartPadding: {
            right: 40
          }
        }} type={'Line'} />
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default QuandlGraph