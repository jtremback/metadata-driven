import React from 'react'
import _ from 'lodash'
import Chartist from 'react-chartist'
import 'whatwg-fetch'

function count (arrayLength, totalWidth, itemWidth) {
  return (totalWidth / itemWidth) / arrayLength
}

function cull (fraction, array) {
  var every = 1 / fraction
  var counter = every

  return array.map(function (item) {
    counter = counter + 1
    if (counter > every) {
      counter = 0
      return item
    }
    return ' '
  })
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
  constructor () {
    super()
    this.parseQuandlTimeSeries = this.parseQuandlTimeSeries.bind(this)
  }

  componentDidMount () {
    this.fetchData(this.props.params)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.params, nextProps.params) &&
    nextProps.params.rows > 1) {
      this.fetchData(nextProps.params)
    }
  }

  parseQuandlTimeSeries (input) {
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
      this.setState({
        data: this.parseQuandlTimeSeries(response.data),
        yAxisLabel: response.column_names[1],
        xAxisLabel: response.column_names[0],
        chartTitle: response.name
      })
    })
  }

  // componentWillUpdate () {

  // }

  render () {
    if (this.state) {

      let labels = this.state.data && this.state.data.labels
      if (labels) {
        const node = React.findDOMNode(this)
        if (node) {
          const totalWidth = node.getBoundingClientRect().width
          labels = cull(count(labels && labels.length, totalWidth, 42), labels)
        }
      }

      return (
        <div>
          <Chartist data={React.addons.update(this.state.data, { labels: { $set: labels }})} options={{
            fullWidth: true,
            height: this.props.height,
            chartPadding: {
              right: 40,
              top: 10
            }
          }} type={'Line'} />
          <div className='graph-title-label'>{this.state.chartTitle}</div>
          <div className='x-axis-label'>{this.state.xAxisLabel}</div>
          <div className='y-axis-label'>{this.state.yAxisLabel}</div>
        </div>
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
