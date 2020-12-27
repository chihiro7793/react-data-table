import { onFilterChange, onStar } from './actions/action';
import useSortableData from './hooks/useSortableData';
import FiltersList from './components/FiltersList';
import DataTable from './components/DataTable';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';


function App({ filters, onFilterChange, data, onStar }) {
  const [currentPage, setCurrentPage] = useState(0);
  const {
    items,
    requestSort,
    sortConfig
  } =
    useSortableData(data);

  return (
    <div className="app">
      <div className="app__container">
        <FiltersList filters={filters} onFilterChange={onFilterChange} />
        <DataTable
          data={items}
          onStar={onStar}
          filters={filters}
          sortConfig={sortConfig}
          handleSort={requestSort}
          currentPage={currentPage}
          prevDisabled={currentPage <= 0}
          setCurrentPage={value => setCurrentPage(currentPage + value)}
          nextDisabled={currentPage >= Math.floor(data.length / 20)}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    filters: state.filters,
    data: state.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilterChange: (id, value) => dispatch(onFilterChange(id, value)),
    onStar: (id) => dispatch(onStar(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);