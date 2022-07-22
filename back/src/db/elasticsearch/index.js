import { Client } from "@elastic/elasticsearch";
import {
    ELASTIC_CLOUD_ID,
    ELASTIC_USERNAME,
    ELASTIC_PASSWORD,
} from "../../config";

class elasticClient {
    constructor() {
        this.client = new Client({
            cloud: {
                id: ELASTIC_CLOUD_ID,
            },
            auth: {
                username: ELASTIC_USERNAME,
                password: ELASTIC_PASSWORD,
            },
        });
    }
    async connectClient() {
        try {
            await this.client.info();
            console.log("ElasticSearch 연결 성공✅");
        } catch (err) {
            console.log("ElasticSearch 연결 실패❌");
        }
    }
    async searchPost({ content }) {
        try {
            const response = await this.client.search({
                index: "post_idx11",
                size: 20,
                query: {
                    bool: {
                        must: [
                            {
                                multi_match: {
                                    query: content,
                                },
                            },
                            {
                                match: {
                                    is_deleted: false,
                                },
                            },
                        ],
                    },
                },
            });
            return response;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

const elasticSearch = new elasticClient();

export { elasticSearch };
