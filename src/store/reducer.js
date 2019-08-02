const defaultState = {
    input: '',
    result: '',
    lastResult: ''
};

/**
* 计算输入框的值
* @return {number}
*/
const caculate = (str) => {
    try {
        str = str.replace(/%/g, '/100');
        str = str.replace(/×/g, '*');
        str = str.replace(/÷/g, '/');
        str = str.replace(/\^/g, '**');
        console.log('caculate str=', str);
        // eslint-disable-next-line
        return eval(str);
    } catch (err) {
        console.log(err);
        return 'error';
    }
    
}

export default (state = defaultState, action) => {
    const newState = {...state}; // JSON.parse(JSON.stringify(state));

    if (action.btnContent === '=') {
        newState.result = caculate(newState.input);
        newState.lastResult = newState.result;
        return newState;
    }

    if (action.btnContent === 'AC') {
        newState.input = ''
        newState.result = '';
        return newState;
    }

    if (action.btnContent === 'DEL') {
        // console.log('newState.input=', newState.input);
        newState.input = newState.input.slice(0, -1);
        return newState;
    }

    if (action.btnContent === 'ANS') {
        newState.input += newState.lastResult;
        return newState;
    }

    if (action.btnContent) {
        newState.input += action.btnContent;
    }

    return newState
} 