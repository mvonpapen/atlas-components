import React from 'react'

import ClusterMarkerGeneHeatmap from './ClusterMarkerGeneHeatmap'
import PlotSettingsDropdown from './PlotSettingsDropdown'
import _ from 'lodash'

const clusterHeatmapView = (props, state, onSelectCluster) => {
  const { data, filteredData, selectedClusterId } = state
  const { ks, ksWithMarkers, selectedK, onSelectK, defaultHeatmapHeight, wrapperClassName } = props
  const { hasDynamicHeight, heatmapRowHeight, species } = props

  const kOptions = ks
    .sort((a, b) => a-b)
    .map((k) => ({
      value: k.toString(),
      label: `k = ${k}`,
      isDisabled: ksWithMarkers ? !ksWithMarkers.includes(k) : false
    }))

  const allClusterIds = _.range(1, parseInt(selectedK) + 1)
  const clusterIdsWithMarkers = data && _.uniq(data.map(x => x.clusterIdWhereMarker))

  const clusterIdOptions = allClusterIds
    .sort((a, b) => a-b)
    .map((clusterId) => ({
      value: clusterId.toString(),
      label: `Cluster ${clusterId}`,
      isDisabled: clusterIdsWithMarkers ? !clusterIdsWithMarkers.includes(clusterId) : false
    }))

// Add default "All clusters" option at the start of the options array
  clusterIdOptions.unshift({
    value: `all`,
    label: `All clusters`,
    isDisabled: false // always show this option
  })


  const markerGeneHeatmap = <ClusterMarkerGeneHeatmap
    data={filteredData}
    isDataFiltered={selectedClusterId && selectedClusterId.value !== `all` || false}
    xAxisCategories={allClusterIds}
    yAxisCategories={_.chain(data).map(cell => _.pick(cell, `geneName`, `clusterIdWhereMarker`)).uniqWith(_.isEqual).map(`geneName`).value()}
    chartHeight={defaultHeatmapHeight}
    hasDynamicHeight={_.chain(filteredData).map(`geneName`).uniq().value().length > 5 ? hasDynamicHeight : false}
    heatmapRowHeight={heatmapRowHeight}
    species={species}
  />

  const dropDownMenu = <PlotSettingsDropdown
    labelText={`Number of clusters:`}
    options={kOptions}
    onSelect={(selectedOption) => onSelectK(selectedOption.value)}
    value={{value: selectedK, label: `k = ${selectedK}`}}
  />

  const dropDownMenu2 = <PlotSettingsDropdown
    labelText={`Show marker genes for:`}
    options={clusterIdOptions}
    onSelect={(selectedOption) => onSelectCluster(selectedOption)}
    value={selectedClusterId || clusterIdOptions[0]}
  />

  const dropDown = <div className={wrapperClassName}>
    <div className={`small-12 medium-6 columns`}>
      {dropDownMenu}
    </div>
    <div className={`small-12 medium-6 columns`}>
      {dropDownMenu2}
    </div>
  </div>

  return [ markerGeneHeatmap, dropDown]
}

export {clusterHeatmapView}