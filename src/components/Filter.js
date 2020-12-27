import React, { useRef } from 'react';
import './Filter.css';

function Filter({ name, onFilterChange, id, value }) {
    function handleInputChange(e) {
        onFilterChange(e.target.value, id);
    }

    return (
        <div className='filter'>
            <div className="filter__label">
                <label>{name}</label>
            </div>
            <div className="filter__input">
                <input type='text' value={value} onChange={(e) => handleInputChange(e)} />
            </div>
        </div>
    )
}

export default (Filter);



