import { isSavedinStorageArray, existingEntries } from '../localStorage/localStorage';
import { mapPureDataToInitData } from '../functions/mapPureDataToInitData';
import { mapParamstoFilters } from '../functions/addToPath';
import { addToPath } from '../functions/addToPath';
import data from '../data/data.json'

let params = new URLSearchParams(window.location.search);

const FILTERS = [
    { id: 1, name: 'فیلد', key: 'field', value: '' },
    { id: 2, name: 'نام‌آگهی', key: 'title', value: '' },
    { id: 3, name: 'تاریخ', key: 'date', value: '' },
    { id: 4, name: 'نام تغییردهنده', key: 'name', value: '' }
]

const INIT_FILTERS = params.get('filter') === null ? FILTERS : mapParamstoFilters(params, FILTERS);
const INIT_DATA = mapPureDataToInitData(data, isSavedinStorageArray);

function reducer(state = { filters: INIT_FILTERS, data: INIT_DATA }, { type, payload }) {
    if (type === 'FILTER_DATA') {
        //Update filters when user enters a filter value
        const filters = [...state.filters];
        const index = filters.findIndex(filter => filter.id === payload.id);
        if (index !== -1) {
            filters.splice(
                index,
                1,
                {
                    ...filters[index],
                    value: payload.value
                }
            );
            addToPath(filters, filters[index].key, params);
            return { ...state, filters };
        }

    } else if (type === 'STAR_ROW') {
        const index = state.data.findIndex(row => row.id === payload);
        if (index !== -1) {
            const data = [...state.data];
            const coppiedItem = { ...data[index] };
            coppiedItem.isStarred = !coppiedItem.isStarred;
            data.splice(
                index,
                1,
                coppiedItem
            )
            //Save a starred row in localStorage
            if (coppiedItem.isStarred) {
                const localStorageEntry = { 'id': payload, 'isStarred': coppiedItem.isStarred };
                existingEntries.push(localStorageEntry);
                localStorage.setItem("allEntries", JSON.stringify(existingEntries));
            } else {
                //Delete a starred row from local storage after removing the star
                const index = existingEntries.findIndex(entry => entry.id === coppiedItem.id);
                if (index !== -1) {
                    existingEntries.splice(index, 1);
                    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
                }
            }
            return { ...state, data };
        }
    }
    return { ...state };
}

export default reducer;
