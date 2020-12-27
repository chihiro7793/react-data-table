import React from 'react';
import compare from '../functions/compare'

const PERSIAN_ALPHABET = [
    'ا', 'آ', 'ب', 'پ', 'ت'
    , 'ث', 'ج', 'چ', 'ح', 'خ'
    , 'د', 'ذ', 'ر', 'ز', 'ژ', 'س'
    , 'ش', 'ص', 'ض', 'ط', 'ظ',
    'ع', 'غ', 'ف', 'ق', 'ک', 'گ'
    , 'ل', 'م', 'ن', 'و', 'ه', 'ی'
];

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];

        if (sortConfig !== null) {
            if (sortConfig.key === 'name') {
                sortableItems.sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            } else {
                sortableItems.sort((a, b) => {
                    if (compare(a[sortConfig.key], b[sortConfig.key], PERSIAN_ALPHABET)) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (compare(b[sortConfig.key], a[sortConfig.key], PERSIAN_ALPHABET)) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                }
                )
            }
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

export default useSortableData;