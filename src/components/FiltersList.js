import React, { useRef } from 'react';
import Filter from './Filter';
import './FiltersList.css';

function FiltersList({ filters, onFilterChange }) {
    return (
        <div className='filtersList'>
            {
                filters.map(filter => (
                    <Filter
                        key={filter.id}
                        name={filter.name}
                        id={filter.id}
                        value={filter.value}
                        onFilterChange={onFilterChange}
                    />
                ))}
        </div>
    )
}
export default FiltersList;