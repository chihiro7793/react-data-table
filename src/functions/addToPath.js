export function addToPath(filters, lastSelectedFilter, params) {
    let flag = true;
    filters.forEach(filter => {
        if (filter.value.length !== 0) {
            if (params.toString().includes(lastSelectedFilter) ||
                params.toString().includes(filter.key)) {
                if (flag) {
                    params.set('filter', filter.key);
                    params.set('value', filter.value);
                    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
                }
            } else {
                params.append('filter', filter.key);
                params.append('value', filter.value);
                flag = false;
                window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
            }
        } else {
            if (params.toString().includes(filter.key)) {
                params.delete('filter', filter.key);
                params.delete('value', filter.value);
                window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
            } else {
                if (params.toString().length === 0) {
                    window.history.pushState({}, '', `${window.location.pathname}`);
                }
            }
        }
    })

}
export function mapParamstoFilters(params, filters) {
    const filterKeys = params.getAll('filter');
    const filterValues = params.getAll('value');
    const finalFilters = filters.map(filter => {
        const index = filterKeys.indexOf(filter.key);
        if (index !== -1) {
            return { ...filter, value: filterValues[index] }
        } else {
            return { ...filter };
        }
    });
    return finalFilters;
}