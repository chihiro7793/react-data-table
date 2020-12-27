import { faStar as regularStar } from '@fortawesome/fontawesome-free-regular';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import applyAllFilters from '../functions/applyAllFilters';
import React from 'react';
import './DataTable.css';

function DataTable({
    data,
    filters,
    currentPage,
    setCurrentPage,
    nextDisabled,
    prevDisabled,
    handleSort,
    sortConfig,
    onStar
}) {
    let filteredData = data;
    filteredData = applyAllFilters(filters, filteredData);
    const dataShownOnCurrentPage = filteredData.slice(currentPage * 20, currentPage * 20 + 20)

    //Set asc or desc icon on click of header cells
    function setSortIcon(column) {
        if (sortConfig !== null &&
            sortConfig.direction === 'ascending' &&
            sortConfig.key === column) {
            return (<FontAwesomeIcon icon={faSortUp} />)
        } else if (sortConfig !== null &&
            sortConfig.direction === 'descending' &&
            sortConfig.key === column) {
            return (<FontAwesomeIcon icon={faSortDown} />)
        }
    }

    return (
        <div className='dataTable'>
            <table>
                <thead>
                    <tr role="row">

                        <th
                            role="columnheader"
                            onClick={() => handleSort('new_value')}
                        >
                            {setSortIcon('new_value')}
                            مقدار جدید
                        </th>
                        <th
                            onClick={() => handleSort('old_value')}
                            role="columnheader">
                            {setSortIcon('old_value')}
                            مقدار قدیمی
                        </th>
                        <th
                            role="columnheader"
                            onClick={() => handleSort('field')}
                        >
                            {setSortIcon('field')}
                            فیلد
                        </th>
                        <th
                            onClick={() => handleSort('title')}
                            role="columnheader"
                        >
                            {setSortIcon('title')}
                            نام آگهی
                        </th>
                        <th
                            role="columnheader"
                            onClick={() => handleSort('date')}
                        >
                            {setSortIcon('date')}
                            تاریخ
                        </th>
                        <th
                            role="columnheader"
                            onClick={() => handleSort('name')}
                        >
                            {setSortIcon('name')}
                            نام تغییردهنده
                        </th>
                        <th
                            role="columnheader"
                        >
                            Starred
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataShownOnCurrentPage.map(row => (
                            <tr key={row.id} role="row">
                                <td role="cell">{row.new_value}</td>
                                <td role="cell">{row.old_value}</td>
                                <td role="cell">{row.field}</td>
                                <td role="cell">{row.title}</td>
                                <td role="cell">{row.date}</td>
                                <td role="cell">{row.name}</td>
                                <td
                                    role="cell"
                                    onClick={() => onStar(row.id)}
                                >
                                    <FontAwesomeIcon
                                        icon={row.isStarred ? faStar : regularStar}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className='table__pagination'>
                <button disabled={prevDisabled} onClick={() => setCurrentPage(-1)}>Previous</button>
                <button disabled={nextDisabled} onClick={() => setCurrentPage(1)}>Next</button>
            </div>
        </div>
    )
}

export default DataTable;