import React from 'react/addons'
import QuandlGraph from './QuandlGraph.js'
import GridLayout from './GridLayout.js'

window.onload = function () {
  React.render(
    <div>
      <GridLayout />
    </div>,
    document.getElementById('container'));
}
