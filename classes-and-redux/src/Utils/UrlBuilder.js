export const urlBuilder = (urlTmp, tmpArgs, queryArgs) => {
    let res = urlTmp;
    
    tmpArgs && Object.keys(tmpArgs)
        .filter(key => tmpArgs[key] != null)
        .forEach(key => res = res.replace(`{${key}}`, encodeURIComponent(tmpArgs[key])));

    if (queryArgs) {
        const queryString = Object.keys(queryArgs)
            .filter(key => queryArgs[key] != null && queryArgs[key].trim() !== '')
            .map(key => `${key}=${encodeURIComponent(Array.isArray(queryArgs[key]) ? JSON.stringify(queryArgs[key]) : queryArgs[key])}`)
            .join('&');
        res += `?${queryString}`;    
    }

    return res;
};