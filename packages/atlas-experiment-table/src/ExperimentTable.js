import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import TableFooter from './TableFooter'
import TableSearchHeader from './TableSearchHeader'
import TableContent from './TableContent'

class ExperimentTable extends React.Component {
  constructor(props) {
    super(props)
    this.entriesPerPageOptions = [10, 25, 50]
    this.state = {
      searchQuery: this.props.species.trim(),
      orderedColumnIndex: 0,
      searchedColumnIndex: this.props.species.trim() ?
        this.props.tableHeader.findIndex(header => header.dataParam === `species`) : 1,
      ascendingOrder: false,
      checkedRows: [],
      currentPage: 1,
      entriesPerPage: this.entriesPerPageOptions[0],
      selectedSearch: ``,
      selectedKingdom: ``
    }

    this.sort = this.sort.bind(this)
    this.filter = this.filter.bind(this)

    this.kingdomOnChange = this.kingdomOnChange.bind(this)
    this.searchAllOnChange = this.searchAllOnChange.bind(this)
    this.numberOfEntriesPerPageOnChange = this.numberOfEntriesPerPageOnChange.bind(this)

    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.tableHeaderOnChange = this.tableHeaderOnChange.bind(this)
    this.tableHeaderOnClick = this.tableHeaderOnClick.bind(this)
  }

  sort(data) {
    const reverseDateRepresentation = date => {
      let parts = date.split(`-`)
      return `${parts[2]}-${parts[1]}-${parts[0]}`
    }
    const {ascendingOrder, orderedColumnIndex} = this.state
    const propKey = this.props.tableHeader[orderedColumnIndex].dataParam
    const sortedAscendingElements = propKey === `lastUpdate` ?
      _.sortBy(data, (o) => reverseDateRepresentation(o[propKey])) :
      _.sortBy(data, propKey)
    return ascendingOrder ? sortedAscendingElements :  sortedAscendingElements.reverse()
  }

  filter(data, tableHeader) {
    const searchQuery = this.state.searchQuery.trim()
    return searchQuery.length === 0 ? data :
      data.filter(row => Array.isArray(row[tableHeader[this.state.searchedColumnIndex].dataParam]) ?
        _.flattenDeep(row[tableHeader[this.state.searchedColumnIndex].dataParam])
          .some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
        :
        row[tableHeader[this.state.searchedColumnIndex].dataParam].toString().toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
  }

  handleCheckbox(accession) {
    const checkedArray = this.state.checkedRows.includes(accession) ?
      this.state.checkedRows.filter(e => e !== accession) :
      this.state.checkedRows.concat(accession)

    this.setState({checkedRows: checkedArray})
  }

  kingdomOnChange(e) {
    this.setState({
      selectedKingdom: e.target.value,
      currentPage: 1
    })
  }

  searchAllOnChange(e) {
    this.setState({
      selectedSearch: e.target.value,
      currentPage: 1
    })
  }

  numberOfEntriesPerPageOnChange(e) {
    this.setState({
      entriesPerPage: e.target.value,
      currentPage: 1
    })
  }

  tableHeaderOnClick(columnNumber) {
    this.setState({
      orderedColumnIndex: columnNumber,
      ascendingOrder: !this.state.ascendingOrder})
  }

  tableHeaderOnChange(value, columnNumber) {
    this.setState({
      searchQuery: value,
      searchedColumnIndex: columnNumber
    })
  }

  render() {
    const { searchQuery, searchedColumnIndex, selectedSearch, selectedKingdom, checkedRows } = this.state
    const { orderedColumnIndex, ascendingOrder } = this.state
    const { entriesPerPage, currentPage } = this.state
    const { host, aaData, tableHeader, enableDownload, downloadTooltip } = this.props

    const displayedFields = tableHeader.map(header => header.dataParam)

    const dataArray = selectedSearch.trim() ?

      this.sort(aaData).filter(data => data &&
        Object.keys(data).map(key => displayedFields.includes(key) ? data[key] : null)
          .some(value => value && value.toString().includes(selectedSearch))) :
      this.filter(this.sort(aaData), tableHeader)
        .filter(data => selectedKingdom ? data.kingdom === selectedKingdom : true)

    const currentPageData = entriesPerPage ?
      dataArray.slice(entriesPerPage * (currentPage - 1), entriesPerPage * currentPage) : dataArray
    const kingdomOptions = [...new Set(aaData.map(data => data.kingdom ))]

    return (
      <div className={`row expanded`}>
        <TableSearchHeader
          kingdomOptions={kingdomOptions}
          totalNumberOfRows={aaData.length}
          entriesPerPageOptions={this.entriesPerPageOptions}
          searchAllOnChange={this.searchAllOnChange}
          numberOfEntriesPerPageOnChange={this.numberOfEntriesPerPageOnChange}
          kingdomOnChange={this.kingdomOnChange}/>

        <TableContent
          {...{
            checkedRows,
            tableHeader,
            entriesPerPage,
            currentPage,
            searchedColumnIndex,
            searchQuery,
            orderedColumnIndex,
            ascendingOrder,
            host,
            enableDownload,
            currentPageData,
            downloadTooltip
          }}
          tableHeaderOnChange={this.tableHeaderOnChange}
          tableHeaderOnClick={this.tableHeaderOnClick}
          downloadOnChange={accession => this.handleCheckbox(accession)}/>


        <TableFooter
          {...{
            currentPage,
            entriesPerPage
          }}
          currentPageDataLength={currentPageData.length}
          dataArrayLength={dataArray.length}
          dataLength={aaData.length} 
          onChange={i => this.setState({currentPage: i})}/>
      </div>
    )
  }
}

ExperimentTable.propTypes = {
  aaData: PropTypes.array.isRequired,
  host: PropTypes.string.isRequired,
  species: PropTypes.string,
  resource: PropTypes.string.isRequired,
  tableHeader: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      dataParam: PropTypes.string.isRequired
    })
  ),
  enableDownload: PropTypes.bool.isRequired,
  downloadTooltip: PropTypes.string.isRequired
}

ExperimentTable.defaultProps = {
  species: ``
}

export default ExperimentTable
