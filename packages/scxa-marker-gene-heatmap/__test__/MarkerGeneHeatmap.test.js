import React from 'react'
import { shallow } from 'enzyme'

import '@babel/polyfill'
import MarkerGeneHeatmap from '../src/MarkerGeneHeatmap'

describe(`MarkerGeneHeatmap`, () => {
  test(`creates plotlines for every cluster if data isn't filtered`, () => {
    const wrapper = shallow(<MarkerGeneHeatmap
      data={[
        {
          x: 0,
          y: 0,
          geneName: `foo`,
          value: 13,
          clusterIdWhereMarker: 1
        },
        {
          x: 1,
          y: 1,
          geneName: `bar`,
          value: 2,
          clusterIdWhereMarker: 2
        },
        {
          x: 2,
          y: 2,
          geneName: `foobar`,
          value: 1,
          clusterIdWhereMarker: 3
        }
      ]}
      xAxisCategories={[`1`, `2`, `3`]}
      yAxisCategories={[`a`, `b`, `c`]}
      chartHeight={200}
      isDataFiltered={false}
      heatmapRowHeight={20}
      hasDynamicHeight={false}
      species={`species`} />)

    const chartOptions = wrapper.children().first().props().options
    expect(chartOptions.yAxis.plotLines).toHaveLength(3)
  })

  test(`doesn’t create plotlines if data is filtered`, () => {
    const wrapper = shallow(<MarkerGeneHeatmap
      data={[
        {
          x: 0,
          y: 0,
          geneName: `foo`,
          value: 13,
          clusterIdWhereMarker: 1
        }
      ]}
      xAxisCategories={[`1`, `2`, `3`]}
      yAxisCategories={[`a`, `b`, `c`]}
      chartHeight={200}
      isDataFiltered={true}
      heatmapRowHeight={20}
      hasDynamicHeight={false}
      species={`species`} />)

    const chartOptions = wrapper.children().first().props().options
    expect(chartOptions.yAxis.plotLines).toHaveLength(0)
  })

  test(`does have data export options and a styled button`, () => {
    const wrapper = shallow(<MarkerGeneHeatmap
      data={[
        {
          x: 0,
          y: 0,
          geneName: `foo`,
          value: 13,
          clusterIdWhereMarker: 1
        }
      ]}
      xAxisCategories={[`1`, `2`, `3`]}
      yAxisCategories={[`a`, `b`, `c`]}
      chartHeight={200}
      isDataFiltered={true}
      heatmapRowHeight={20}
      hasDynamicHeight={false}
      species={`species`} />)

    const chartOptions = wrapper.children().first().props().options

    expect(chartOptions.exporting.buttons.contextButton.text).toEqual(
      `Download`)

    expect(chartOptions.exporting.buttons.contextButton.symbol).toEqual(`download`)

    expect(chartOptions.exporting.buttons.contextButton.menuItems).toEqual(
      [
        `downloadPNG`,
        `downloadJPEG`,
        `downloadPDF`,
        `downloadSVG`,
        `separator`,
        `downloadCSV`,
        `downloadXLS`
      ]
    )
  })
})
