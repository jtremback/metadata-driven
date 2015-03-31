import React from 'react/addons'
import QuandlGraph from './QuandlGraph.js'
import GridLayout2 from './GridLayout2.js'

window.onload = function () {
  React.render(
    <div>
      <GridLayout2 />
    </div>,
    document.getElementById('container'));
}
