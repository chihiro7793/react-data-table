export const onFilterChange = (value, id) => {
    return ({
        type: 'FILTER_DATA',
        payload: { value, id }
    });
}

export const onStar = (id) => {
    return ({
        type: 'STAR_ROW',
        payload: id
    });
}