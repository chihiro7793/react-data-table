let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
if (existingEntries == null) existingEntries = [];
let isSavedinStorageArray = JSON.parse(localStorage.getItem("allEntries") || "[]");

export { existingEntries, isSavedinStorageArray };