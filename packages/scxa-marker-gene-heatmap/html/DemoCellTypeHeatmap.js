import React from 'react'
import ReactDOM from 'react-dom'

import HeatmapView from '../src/index.js'

const props = {
  resource: ``,
  host:
"https://gist.githubusercontent.com/lingyun1010/065426db1011c1a080d58cf0f18bb872/raw/c7ac88d119db912433daf302efa5ed23acc1f43f/cellTypeWheelJsonPayload.json",
  type:`cellType`,
  props: {
    species: `Homo sapiens`,
    hasDynamicHeight: true,
    heatmapRowHeight: 20,
    wrapperClassName: `row expanded`,
  }
}

const render = (options, target) => {
  ReactDOM.render(<HeatmapView {...props}/>, document.getElementById(target))
}

export {render}
