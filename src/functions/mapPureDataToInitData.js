export const mapPureDataToInitData = (data, isSavedinStorageArray,) => {
    return (
        data.map(d => {
            const index = isSavedinStorageArray.findIndex(storeObj => storeObj.id === d.id);
            if (index !== -1) {
                return { ...d, isStarred: true }
            } else {
                return { ...d, isStarred: false }
            }
        })
    )

}
