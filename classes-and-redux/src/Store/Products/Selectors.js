const sorterFactory = (sortOptions, productsMap) => {
    const { field, isDesc } = sortOptions;

    const compareStringFields = (a, b) => {
        const aObj = productsMap[a];
        const bObj = productsMap[b];
        return aObj[field].localeCompare(bObj[field]) * (isDesc ? -1 : 1)
    };

    const compareNumberFields = (a, b) => {
        const aObj = productsMap[a];
        const bObj = productsMap[b];
        return (aObj[field] - bObj[field]) * (isDesc ? -1 : 1)
    };

    return field === 'name'
        ? compareStringFields
        : compareNumberFields;
}

export const filterProductIds = state => {
    const productsMap = state.products.list;
    const filter = state.products.filter;
    const filteredIds = filter ? state.products.ids.filter(x => productsMap[x].name.toLowerCase().includes(filter.toLowerCase())) : state.products.ids;
    return filteredIds.sort(sorterFactory(state.products.sortOptions, productsMap));
}