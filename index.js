import React from 'react/addons'
import GraphView from './GraphView.js'
import GridLayout2 from './GridLayout.js'

window.onload = function () {
  React.render(
    <div>
      <GridLayout2 />
    </div>,
    document.getElementById('container'));
}
