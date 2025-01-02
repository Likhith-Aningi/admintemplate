const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 1 day expiry

export const getCache = (key) => {
    const cache = localStorage.getItem(key);
    if (cache) {
        const parsedCache = JSON.parse(cache);
        const isExpired = new Date().getTime() - parsedCache.timestamp > CACHE_EXPIRY;
        if (isExpired) {
            localStorage.removeItem(key);
            return null;
        }
        return parsedCache.data;
    }
    return null;
};

export const setCache = (key, data) => {
    if (data.message === "ERROR") return;
    const cache = {
        timestamp: new Date().getTime(),
        data: data,
    };
    localStorage.setItem(key, JSON.stringify(cache));
};
