import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface websiteSchemaInterface {
    id: number;
    url: string;
    meta_title: string | null;
    meta_description: string | null;
    img: Text | null;
}

export interface WebsiteModel
    extends Model<websiteSchemaInterface>,
        websiteSchemaInterface {}
export type WebsiteStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): WebsiteModel;
};

export default function WebsiteSchema(sequelize: Sequelize) {
    return <WebsiteStatic>sequelize.define(
        "website",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "사이트 ID",
            },
            url: {
                type: DataTypes.STRING(500),
                allowNull: false,
                unique: true,
                comment: "사이트 링크",
            },
            meta_title: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "메타 제목",
            },
            meta_description: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "메타 내용",
            },
            img: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "사이트 이미지",
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["id"],
                },
            ],
        },
    );
}
