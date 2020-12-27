
function applyAllFilters(filters, data) {
    let filteredData = data;
    filters.forEach(element => {
        if (element.value.length !== 0) {
            if (element.key !== 'date') {
                filteredData = filteredData.filter(d => {
                    return (d[element.key].toLowerCase().includes(element.value.toLowerCase()))
                })
            } else {
                if (element.value.length >= 4) {
                    filteredData = binaryFilter(filteredData, element.value);
                }
            }
        }
    });
    return filteredData;
}

function binarySearch(arr, x) {
    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid]['date'].includes(x)) {
            return mid;
        } else if (arr[mid]['date'] < x) {
            start = mid + 1;
        } else if (arr[mid]['date'] > x) {
            end = mid - 1;
        }

    }
    return -1;
}

function binaryFilter(data, key) {
    let coppiedData = [...data];
    coppiedData.sort((a, b) => {
        if (a['date'] < b['date']) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });
    let filteredArr = [];
    let result = 0;
    while (result !== -1) {
        result = binarySearch(coppiedData, key);
        if (result !== -1) {
            filteredArr.push(coppiedData[result]);
            coppiedData.splice(result, 1);
        }
    }
    return filteredArr;
}

export default applyAllFilters;