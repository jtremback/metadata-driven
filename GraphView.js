import React from 'react'
import _ from 'lodash'
import Chartist from 'react-chartist'
import 'whatwg-fetch'

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

class GraphView extends React.Component {

  componentDidMount () {
    this.fetchData(this.props.params)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.params, nextProps.params) &&
    nextProps.params.rows > 1) {
      this.fetchData(nextProps.params)
    }
  }

  fetchData (params) {
    const url = `https://www.quandl.com/api/v1/datasets/${params.code}.json?rows=${params.rows}&auth_token=3XJzrsSsLc8rzfxvwhFM`
    console.log(url)
    fetch(url)
    .then((response) => {
        if (response.status >= 400) {
            throw new Error(`Bad response from server`)
        }
        return response.json()
    })
    .then((response) => {
      const values = parseQuandlTimeSeries(response.data)
      this.setState({ data: values })
    })
  }

  render () {
    if (this.state) {
      return (
        <Chartist data={this.state.data} options={{
          fullWidth: true,
          height: this.props.height,
          chartPadding: {
            right: 40,
            top: 10
          }
        }} type={'Line'} />
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

GraphView.propTypes = {
  params: React.PropTypes.shape({
    code: React.PropTypes.string.isRequired,
    rows: React.PropTypes.number.isRequired
  }),
  height: React.PropTypes.number.isRequired
}

export default GraphView
