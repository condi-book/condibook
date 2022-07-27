import { parser } from "url-meta-scraper";

async function parsers(url: any) {
    const meta = await parser(url);

    const ogTitle = meta.og?.title || undefined;
    const ogDescription = meta.og?.description || undefined;
    const ogImg = meta.og?.image || undefined;

    const metaTitle = meta.meta?.title || undefined;
    const metaDescription = meta.meta?.description || undefined;
    const metaImg = meta.twitter?.image || undefined;

    let title = ogTitle ?? metaTitle;
    let description = ogDescription ?? metaDescription;
    let img = ogImg ?? metaImg;

    title = title ?? null;
    description = description ?? null;
    img = img ?? null;

    return { title, description, img };
}

export { parsers };
