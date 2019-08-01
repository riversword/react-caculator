const defaultState = {
    input: '0',
    result: '0'
};

const caculate = (str) => {
    return eval(str);
}

export default (state = defaultState, action) => {
    const newState = {...state}; // JSON.parse(JSON.stringify(state));

    if (action.btnContent === '=') {
        // newState.input += action.btnContent;
        newState.result = caculate(newState.input);
        return newState;
    }

    if (action.btnContent === 'C') {
        // newState.input += action.btnContent;
        newState.result = caculate(newState.input);
        return newState;
    }

    if (action.btnContent === 'oo') {
        newState.result = caculate(newState.input);
        return newState;
    }

    if (action.btnContent) {
        newState.input += action.btnContent;
    }

    return newState
} 