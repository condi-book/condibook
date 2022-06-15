const getSuccessMsg = ({ entity, action }) => {
    return { message: `${entity}을(를) ${action}했습니다.` };
};

const getFailMsg = ({ entity, action }) => {
    return { errorMessage: `${entity}을(를) ${action}하지 못했습니다.` };
};

export { getSuccessMsg, getFailMsg };
