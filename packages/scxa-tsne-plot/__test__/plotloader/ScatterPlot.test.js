import React from 'react'
// Highcharts can only be shallow-rendered if it’s mocked, see __mocks__/highcharts.js
import { shallow } from 'enzyme'

import '@babel/polyfill'
import ScatterPlot from '../../src/plotloader/ScatterPlot'
import { randomHighchartsSeriesWithSeed } from '../Utils'

describe(`ScatterPlot`, () => {

  test(`merges additional options for Highcharts`, () => {
    const highchartsConfig = {
      chart: {
        height: `50%`, // existing property, overwritten
        width: `50%`   // new property
      }
    }
    const wrapper = shallow(<ScatterPlot series={[]} highchartsConfig={highchartsConfig}/>)
    const chartOptions = wrapper.children().first().props().options
    expect(chartOptions).toHaveProperty(`chart.height`, `50%`)
    expect(chartOptions).toHaveProperty(`chart.width`, `50%`)
  })

  test(`uses a styled download button`, () => {
    const wrapper = shallow(<ScatterPlot series={[]}/>)
    const chartOptions = wrapper.children().first().props().options
    expect(chartOptions).toHaveProperty(`exporting.buttons.contextButton.text`, `Download`)
    expect(chartOptions).toHaveProperty(`exporting.buttons.contextButton.symbol`, `download`)
  })

  test(`with no series matches snapshot`, () => {
    const tree = shallow(<ScatterPlot series={[]}/>)
    expect(tree).toMatchSnapshot()
  })

  test(`marker radius changes depending on number of total points`, () => {
    const wrapper = shallow(<ScatterPlot series={[]}/>)

    const longSeriesName = `Series with 5,000 points`
    const longSeriesData = []
    for (let i = 0 ; i < 5000 ; i++) {
      longSeriesData.push({
        name: `Point ${i}`,
        x: 0,
        y: 0,
        expressionLevel: 0
      })
    }
    const longSeries = {
      name: longSeriesName,
      data: longSeriesData
    }
    wrapper.setProps({ series: [longSeries] })
    const markerRadiusLongSeries = wrapper.children().first().props().options.plotOptions.series.marker.radius

    const shortSeriesName = `Series with 4,999 points`
    const shortSeriesData = []
    for (let i = 0 ; i < 4999 ; i++) {
      shortSeriesData.push({
        name: `Point ${i}`,
        x: 0,
        y: 0,
        expressionLevel: 0
      })
    }
    const shortSeries = {
      name: shortSeriesName,
      data: shortSeriesData
    }
    wrapper.setProps({ series: [shortSeries] })
    const markerRadiusShortSeries = wrapper.children().first().props().options.plotOptions.series.marker.radius

    expect(markerRadiusLongSeries).not.toBe(markerRadiusShortSeries)
  })

  /* TODO
   * This test fails because we mock Highcharts and Jest fails if we don’t mock it. Review after we’ve switch to the
   * official Highcharts React wrapper.
   */
  // test(`afterRender callback is invoked after rendering the component`, done => {
  //   const afterRenderSpy = jest.fn(() => {
  //     done()
  //   })
  //
  //   shallow(<ScatterPlot series={[]} afterRender={afterRenderSpy} />)
  // })


  test(`matches snapshot with randomized series`, () => {
    const series = randomHighchartsSeriesWithSeed()
    const tree = shallow(<ScatterPlot series={series}/>)
    expect(tree).toMatchSnapshot()
  })

  test(`doesn’t check for unique names in the same series or among different series`, () => {
    const series = {
      series: [
        {
          name: `Cluster 1`,
          data: [
            {x: 0, y: 0, name: `Cell A`, expressionLevel: 0},
            {x: 0, y: 0, name: `Cell A`, expressionLevel: 0},
            {x: 1.11111, y: 2.22222, name: `Cell B`, expressionLevel: 9.99999}
          ]
        },
        {
          name: `Cluster 2`,
          data: [
            {x: 0, y: 0, name: `Cell A`, expressionLevel: 0},
            {x: 1.11111, y: 2.22222, name: `Cell B`, expressionLevel: 9.99999}
          ]
        },
        {
          name: `Cluster 3`,
          data: [
            {x: 1.11111, y: 2.22222, name: `Cell A`, expressionLevel: 9.99999}
          ]
        }
      ]
    }

    const tree = shallow(<ScatterPlot {...series}/>)
    expect(tree).toMatchSnapshot()
  })
})
