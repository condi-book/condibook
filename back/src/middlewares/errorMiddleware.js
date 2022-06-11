const errorMiddleware = (error, req, res, next) => {
    // 터미널에 노란색으로 출력됨.
    console.log("\x1b[33m%s\x1b[0m", error);
    res.status(400).send(error.message);
};

const checkErrorMessage = (result) => {
    if (result.errorMessage) {
        throw Error(result.errorMessage);
    }
};

const getQueryResultMsg = ({ result, expectation, entity, queryType }) => {
    if (result !== expectation) {
        return { errorMessage: `${entity}을(를) ${queryType}하지 못했습니다.` };
    }

    return { message: `${entity}을(를) ${queryType}했습니다.` };
};

export { errorMiddleware, checkErrorMessage, getQueryResultMsg };
