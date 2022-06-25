import { parser } from "url-meta-scraper";

async function parsers(url) {
    const meta = await parser(url);

    let title =
        (meta.og?.title ? meta.og?.title : meta.meta?.title) ?? "정보 없음";
    let description =
        (meta.og?.description
            ? meta.og?.description
            : meta.meta?.description) ?? "정보 없음";
    let img =
        (meta.og?.image ? meta.og?.image : meta.twitter?.image) ?? "정보 없음";

    return { title, description, img };
}

export { parsers };
