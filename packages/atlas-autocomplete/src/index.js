import React from 'react'
import ReactDOM from 'react-dom'

import Autocomplete from './Autocomplete'

const render = (options, target) => {
  ReactDOM.render(
    <Autocomplete {...options} />,
    document.getElementById(target))
}

export { render }
