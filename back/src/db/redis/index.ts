import { createClient } from "redis";

class RedisClient {
    constructor() {
        this.client = createClient({
            socket: {
                host: "redis_server",
                port: 6379,
                reconnectStrategy() {
                    return new Error();
                },
            },
        });
    }

    async connectClient() {
        try {
            await this.client.connect();
            console.log("Redis 연결 성공✅");
        } catch (err) {
            console.log("Redis 연결 실패❌");
        }
    }

    async setValue({ key, field, valueObj, ttl }) {
        try {
            await this.client.hSet(key, field, JSON.stringify(valueObj));
            await this.client.expire(key, Number(ttl));
        } catch (err) {
            console.log("\x1b[35m%s\x1b[0m", "Redis setValue " + err);
        }
    }

    async getValue({ key, field }) {
        try {
            const value = await this.client.hGet(key, field);
            return JSON.parse(value);
        } catch (err) {
            console.log("\x1b[35m%s\x1b[0m", "Redis getValue " + err);
        }
    }

    async quitClient() {
        try {
            await this.client.disconnect();
            console.log("Redis 중단 성공🚨");
        } catch (err) {
            console.log("\x1b[35m%s\x1b[0m", "Redis quit " + err);
        }
    }
}

const redisClient = new RedisClient();
redisClient.connectClient();

export { redisClient };
