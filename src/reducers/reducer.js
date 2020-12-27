// import { useHistory } from 'react-router-dom';
import data from '../data/data.json';

const FILTERS = [
    { id: 1, name: 'فیلد', key: 'field', value: '' },
    { id: 2, name: 'نام‌آگهی', key: 'title', value: '' },
    { id: 3, name: 'تاریخ', key: 'date', value: '' },
    { id: 4, name: 'نام تغییردهنده', key: 'name', value: '' }
]
let params = new URLSearchParams(window.location.search);
let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
if (existingEntries == null) existingEntries = [];
let isSavedinStorageArray = JSON.parse(localStorage.getItem("allEntries") || "[]");

const INIT_DATA = data.map(d => {
    const index = isSavedinStorageArray.findIndex(storeObj => storeObj.id === d.id);
    if (index !== -1) {
        return { ...d, isStarred: true }
    } else {
        return { ...d, isStarred: false }
    }
});

const mapParamstoFilters = (params) => {
    const filterKey = params.get('filter');
    console.log(filterKey);
    const final = FILTERS.map(filter => {
        if (filter.key === filterKey) {
            return { ...filter, value: params.get('value') }
        } else {
            return { ...filter };
        }
    });
    return final;
}
const INIT_FILTERS = params.get('filter') === null ? FILTERS : mapParamstoFilters(params);

const reducer = (state = { filters: INIT_FILTERS, data: INIT_DATA }, { type, payload }) => {

    if (type === 'FILTER_DATA') {
        const index = state.filters.findIndex(filter => filter.id === payload.id);
        if (index !== -1) {
            const filters = [...state.filters];
            filters.splice(
                index,
                1,
                {
                    ...filters[index],
                    value: payload.value
                }
            );

            filters.forEach(filter => {
                if (filter.value.length !== 0) {
                    if (params.toString().includes(filters[index].key) ||
                        params.toString().includes(filter.key)) {
                        params.set('filter', filter.key);
                        params.set('value', filter.value);
                        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
                    } else {
                        params.append('filter', filter.key);
                        params.append('value', filter.value);
                        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
                    }
                } else {
                    console.log('khar');
                    if (params.toString().includes(filter.key)) {
                        params.delete('filter', filter.key);
                        params.delete('value', filter.value);
                        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
                    } else {
                        console.log('khar prim');
                        if (params.toString().length === 0) {
                            window.history.pushState({}, '', `${window.location.pathname}`);
                        }
                    }
                }
            })
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
            if (coppiedItem.isStarred) {
                const localStorageEntry = { 'id': payload, 'isStarred': coppiedItem.isStarred };
                existingEntries.push(localStorageEntry);
                localStorage.setItem("allEntries", JSON.stringify(existingEntries));
            } else {
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
