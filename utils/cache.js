const redis = require('./redis');

module.exports = {

    async get(key) {
        const data = await redis.get(key);

        return data ? JSON.parse(data) : null
    },

    async set(key, data, ttlseconds = 120) {

        await redis.set(key, JSON.stringify(data), 'EX', ttlseconds);
    },

    async invalidate(key) {
        await redis.del(key);
    },
    async invalidateByPrefix(prefix) {
        const keys = await redis.keys(`${prefix}*`);

        if (keys.length) await redis.del(...keys);
    }
}