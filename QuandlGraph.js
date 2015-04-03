import React from 'react'
import _ from 'lodash'
import Chartist from 'react-chartist'
import 'whatwg-fetch'
import EditModal from './EditModal.js'

function parseQuandlTimeSeries (input) {
  let output = {
    labels: [],
    series: [[]]
  }

  input.forEach(item => {
    output.labels.unshift(decorateQuandlDate(item[0]))
    output.series[0].unshift(item[1])
  })

  return (output)
}

function decorateQuandlDate (date) {
  date = date.match(/(\d{4})-(\d{2})-(\d{2})/)
  const year = date[1]
  const month = date[2]
  const day = date[3]
  return `
<div class="quandl-month-day">${month}/${day}</div>
<div class="quandl-year">${year}</div>
`
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

  componentDidUpdate (prevProps) {
    console.log('prevProps', prevProps)
    console.log('this.props', this.props, '\n')
  }

  render () {
    if (this.state) {
      return (
        <div className='quandle-graph'>
          <EditModal data={this.state.data} />
          <Chartist data={this.state.data} options={{
            fullWidth: true,
            height: this.props.height,
            chartPadding: {
              right: 40,
              top: 10
            }
          }} type={'Line'} />
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default QuandlGraph