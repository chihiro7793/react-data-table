import React from 'react';
import './DataTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/fontawesome-free-regular';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';


function filterAll(filters, data) {
    let filteredData = data;
    filters.forEach(element => {
        if (element.value.length !== 0) {
            if (element.key !== 'date') {
                filteredData = filteredData.filter(d => {
                    return (d[element.key].toLowerCase().includes(element.value.toLowerCase()))
                })
            } else {
                filteredData = binaryFilter(filteredData, element.value);
            }

        }

    });
    return filteredData;
}

function bSearch(arr, x) {
    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid]['date'].includes(x)) return mid;
        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }
    return -1;
}

function binaryFilter(data, key) {
    data.sort();
    let filteredArr = [];
    let result = 0;
    while (result !== -1) {
        result = bSearch(data, key);
        if (result !== -1) {
            filteredArr.push(data[result]);
            data.splice(result, 1);
        }
    }
    return filteredArr;
}
function DataTable({
    data,
    filters,
    setCurrentPage,
    nextDisabled,
    prevDisabled,
    handleSort,
    sortConfig,
    onStar
}) {
    let filteredData = data;
    filteredData = filterAll(filters, filteredData);
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
                        // onClick={() => handleSort('new_value')}
                        >
                            Starred
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(row => (
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