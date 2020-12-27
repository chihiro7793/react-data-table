
function applyAllFilters(filters, data) {
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

function binarySearch(arr, x) {
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
        result = binarySearch(data, key);
        if (result !== -1) {
            filteredArr.push(data[result]);
            data.splice(result, 1);
        }
    }
    return filteredArr;
}

export default applyAllFilters;