function sortKeyword(keyword) {
    let sorted = Object.entries(keyword)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    let keywords = Object.keys(sorted).slice(0, 3).join(",");
    return keywords;
}

export { sortKeyword };
