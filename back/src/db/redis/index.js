import { createClient } from "redis";

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.connect();
    }

    async setValue({ key, field, valueObj, ttl }) {
        await this.client.hSet(key, field, JSON.stringify(valueObj));
        await this.client.expire(key, Number(ttl));
    }

    async getValue({ key, field }) {
        const value = await this.client.hGet(key, field);
        return JSON.parse(value);
    }
}

const redisClient = new RedisClient();

export { redisClient };
