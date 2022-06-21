function getUserIP(req) {
    const addr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    return addr;
}

export { getUserIP };
