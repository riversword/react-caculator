const defaultState = {
	input: '', // 输入框1内容
	input2: '0', // 输入框2
    result: '0', // 结果
	memory: null, // 记忆存储值
	lastInput: '=' // 上一步的输入是，'='，'num'，'sign'符号，'.'，'('左括号，')'右括号
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

/**
* 验证能否输入')'
* @return {boolean}
*/
const canInputRightBracket = (str) => {
	console.log('str=', str);
	let stack = [];
	for (let s of str) {
		console.log('s=', s);
		if (s === '(') {
			stack.push(')');
		} else if (s === ')') {
			if (stack.length > 0) {
				stack.pop();
			} else {
				return false;
			}
		}
	}
	console.log('stack=', stack);
	
	if (stack.length > 0) {
		return true;
	}
}

/**
* 验证括号是否闭合了
* @return {boolean}
*/
/*
const isBracketsClose = (str) => {
	let stack = [];
	for (let s in str) {
		if (s === '(') {
			stack.push(')');
		} else if (s === ')') {
			if (stack.length > 0) {
				stack.pop();
			} else {
				return false;
			}
		}
	}
	
	if (stack.length === 0) {
		return true;
	} else {
		return false;
	}
}
*/

/**
* 获取到当前括号内的计算结果
* @return {number}
*/
const getBracketValue = (str) => {
	// 查找到未闭合的左括号，索引位置
	let stack = [];
	let braIndexArr = [];
	for (let s of str) {
		if (s === '(') {
			stack.push(')');
		} else if (s === ')') {
			if (stack.length > 0) {
				stack.pop();
			} else {
				return false;
			}
		}
	}


	let start = 0;
	while (str.indexOf('(', start) > -1) {
		let index = str.indexOf('(', start);
		braIndexArr.push(index);
		start = index + 1;
	}
	console.log('braIndexArr=', braIndexArr);
	console.log('stack=', stack);

	if (stack.length === 0) {
		// 表达式中的所有括号都已经闭合
		return caculate(str);
	} else {
		// 最外层的stack.length个括号，未闭合;
		console.log('braIndexArr[stack.length-1] + 1=', braIndexArr[stack.length-1] + 1);
		return caculate(str.slice(braIndexArr[stack.length-1] + 1));
	}
}


export default (state = defaultState, action) => {
	const newState = {...state}; // JSON.parse(JSON.stringify(state));
	console.log('newState=', newState);
	console.log('action=', action);

	if (!action.btnContent) {
		return newState;
	}

    switch (action.btnContent) {
        case '=':
			if (newState.lastInput === 'num' || newState.lastInput === '%') {
				newState.input += newState.input2;
			}

			// 若input不合法，则点击=无反应
			if (caculate(newState.input) === 'error' || newState.lastInput === '=') {
				return newState;
			}

			newState.result = caculate(newState.input);
			newState.input2 = newState.result;
            newState.input = '';

            newState.lastInput = '=';
			break;

        case 'AC': // 清除所有
			newState.input = '';
			newState.input2 = '0';
			newState.result = '';

			newState.lastInput = '=';
            break;

		case 'C': // 删除前一个字符
			if (newState.input2.length > 1) {
				newState.input2 = newState.input2.slice(0, -1);
			} else {
				newState.input2 = '0';
			}
            break;

		case 'mc': // 清空存储
			newState.memory = null;
			break;

		case 'm+': // 存储值加上input2
			if (newState.memory === null) {
				newState.memory = newState.input2
			} else {
				newState.memory += 0 + newState.input2
			}
			break;

		case 'm-': // 存储值减去input2
			if (newState.memory === null) {
				newState.memory = 0 - newState.input2
			} else {
				newState.memory = newState.memory - newState.input2
			}
			break;

		case 'mr': // 读取存储值
			newState.input2 = newState.memory;
			newState.lastInput = 'num';
			break;

		case '+/-': // 取反
			if (newState.lastInput === 'num') {
				if (newState.input2 > 0) {
					newState.input2 = '-' + newState.input2;
				} else {
					newState.input2 = Math.abs(newState.input2);
				}
			} else if (newState.lastInput === ')') {
				// 对匹配到的闭括号取反
			}
			break;

		case '.': // 小数点
			if (newState.lastInput !== 'num') {
				return newState;
			}
			newState.input2 += action.btnContent;
			newState.lastInput = '.';
			break;

		case '%': // 百分号
			if (newState.lastInput === 'num') {
				newState.input2 += action.btnContent;
				newState.lastInput = '%';
			}
			break;

		case '(': // 左括号
			if (newState.lastInput === 'sign' || newState.lastInput === '=') {
				newState.input += action.btnContent;
				newState.lastInput = '(';
			}
			break;

		case ')': // 右括号
			// 验证是否能输入)
			if (canInputRightBracket(newState.input)) {
				newState.input += newState.input2;
				newState.input += action.btnContent;

				// 计算出当前闭括号内的值
				newState.input2 = getBracketValue(newState.input);
			}
			newState.lastInput = ')';
			break;

        default: // 1234567890 +-×÷^
			const calStr = '+-×÷^';
			const numStr = '1234567890';

			// 1234567890
			if (numStr.indexOf(action.btnContent)  > -1) {
				console.log('newState.lastInput=', newState.lastInput);
				if (newState.input2 === '0') {
					newState.input2 = action.btnContent;
				} else {
                    if (newState.lastInput === 'num' || newState.lastInput === '.') {
                        newState.input2 += action.btnContent;
                    } else {
                        newState.input2 = action.btnContent;
                    }
                }
                newState.lastInput = 'num';
			}

			// +-×÷^
			if (calStr.indexOf(action.btnContent)  > -1) {
				console.log('newState.input=', newState.input);
                if (newState.lastInput === 'sign' || newState.lastInput === '.' || newState.lastInput ==='(') {
                    // return newState;
				} else if (newState.lastInput === ')') {
					if (caculate(newState.input) !== 'error') {
						newState.result = caculate(newState.input); // 计算前面的表达式
					}
					newState.input += action.btnContent;
					newState.input2 = newState.result;
				} else if (newState.lastInput === '=') {
					newState.input += newState.input2;
					newState.input += action.btnContent;
				} else {
					// 上一次输入为数字
					if (newState.input2 < 0) {
						newState.input += '(' + newState.input2 + ')';
					} else {
						newState.input += newState.input2;
					}

					newState.input2 = getBracketValue(newState.input);
					newState.input += action.btnContent;
				}
				newState.lastInput = 'sign';
			}
    }
    return newState;
}
