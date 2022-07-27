export const PORT: string = process.env.PORT || "3030";
export const JWT_SECRET_KEY: string =
    process.env.JWT_SECRET_KEY || "jwt-secret-key";

export const CLIENT_URL: string = process.env.CLIENT_URL || "";
export const AI_SERVER_URL: string = process.env.AI_SERVER_URL || "";

export const DB_DATABASE: string =
    process.env.DB_DATABASE || "env 확인해주십시오.";
export const DB_USER: string = process.env.DB_USER || "env 확인해주십시오.";
export const DB_PW: string = process.env.DB_PW || "env 확인해주십시오.";
export const DB_HOST: string = process.env.DB_HOST || "env 확인해주십시오.";
export const DB_DIALECT: string =
    process.env.DB_DIALECT || "env 확인해주십시오.";

export const KAKAO_CLIENT_ID: string = process.env.KAKAO_CLIENT_ID || "";
export const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET: string =
    process.env.GOOGLE_CLIENT_SECRET || "";

export const ELASTIC_CLOUD_ID: string = process.env.ELASTIC_CLOUD_ID || "";
export const ELASTIC_USERNAME: string = process.env.ELASTIC_USERNAME || "";
export const ELASTIC_PASSWORD: string = process.env.ELASTIC_PASSWORD || "";
