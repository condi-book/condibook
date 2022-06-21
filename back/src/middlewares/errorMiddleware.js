const errorMiddleware = (error, req, res, next) => {
    // 터미널에 노란색으로 출력됨.
    console.log("\x1b[33m%s\x1b[0m", error);
    res.status(400).send(error.message);
};

const serverErrorMiddleware = (error, req, res, next) => {
    // 터미널에 마젠타색으로 출력됨.
    console.log("\x1b[35m%s\x1b[0m", error);
    res.status(500).send(error.message);
};

const checkErrorMessage = (result) => {
    if (result.errorMessage) {
        throw Error(result.errorMessage);
    }
};

export { errorMiddleware, serverErrorMiddleware, checkErrorMessage };
