import React from 'react';
import compareWords from '../functions/compareWords'

const PERSIAN_ALPHABET = [
    'ا', 'آ', 'ب', 'پ', 'ت'
    , 'ث', 'ج', 'چ', 'ح', 'خ'
    , 'د', 'ذ', 'ر', 'ز', 'ژ', 'س'
    , 'ش', 'ص', 'ض', 'ط', 'ظ',
    'ع', 'غ', 'ف', 'ق', 'ک', 'گ'
    , 'ل', 'م', 'ن', 'و', 'ه', 'ی'
];

//A custom hook to sort items asc/desc  
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];

        if (sortConfig !== null) {
            if (sortConfig.key === 'name') {
                //Regular sort for english words
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
                //Sorts based on persian alphabet 
                sortableItems.sort((a, b) => {
                    if (compareWords(a[sortConfig.key], b[sortConfig.key], PERSIAN_ALPHABET)) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (compareWords(b[sortConfig.key], a[sortConfig.key], PERSIAN_ALPHABET)) {
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