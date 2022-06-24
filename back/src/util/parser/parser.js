import { parser } from "url-meta-scraper";

async function parsers(url) {
    const meta = await parser(url);
    let title = meta.og.title ? meta.og.title : meta.meta.title;
    let description = meta.og.description
        ? meta.og.description
        : meta.meta.description;
    let img = meta.og.image ? meta.og.image : meta.twitter.image;
    return { title, description, img };
}

export { parsers };
