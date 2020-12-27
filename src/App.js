import './App.css';
import React, { useState } from 'react';
import FiltersList from './components/FiltersList'
import DataTable from './components/DataTable';
import useSortableData from './hooks/useSortableData';
import { onFilterChange, onStar } from './actions/action';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App({ filters, onFilterChange, data, onStar }) {
  const [currentPage, setCurrentPage] = useState(0);
  const { items, requestSort, sortConfig } = useSortableData(data.slice(currentPage * 20, currentPage * 20 + 20));
  const MyFiltersList = () => {
    return (<FiltersList filters={filters} onFilterChange={onFilterChange} />)
  }
  const MyDataTable = () => {
    return (
      <DataTable
        data={items}
        filters={filters}
        currentPage={currentPage}
        setCurrentPage={value => setCurrentPage(currentPage + value)}
        nextDisabled={currentPage >= Math.floor(data.length / 20)}
        prevDisabled={currentPage <= 0}
        handleSort={requestSort}
        sortConfig={sortConfig}
        onStar={onStar}
      />
    )
  }
  return (
    <Router>
      <div className="app">
        <div className="app__container">
          <Route exact path='/' component={MyFiltersList} />
          <Route exact path='/' component={MyDataTable} />
        </div>
      </div>
    </Router>

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