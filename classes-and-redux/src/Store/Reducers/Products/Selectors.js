export const filterProductIds = state => {
    const productsMap = state.products.list;
    const filter = state.products.filter;
    return filter ? state.products.ids.filter(x => productsMap.get(x).name.toLowerCase().includes(filter.toLowerCase())) : state.products.ids;
}