import React, { Component } from 'react';
import DisplayScreen from '../components/DisplayScreen/index.js';
import Keyboard from '../components/Keyboard/index.js';

class UseState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            result: '',
            lastResult: ''
        }

        this.clickBtn = this.clickBtn.bind(this);
    }

    clickBtn(e) {
        const str = e.target.innerHTML;
        let input = this.state.input;
        let result = this.state.result;
        let lastResult = this.state.lastResult;

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

        if (str === '=') {
            result = caculate(input);
            lastResult = result;
            this.setState({
                result,
                lastResult
            });
            return false;
        }
    
        if (str === 'AC') {
            input = ''
            result = '';
            this.setState({
                input,
                result
            });
            return false;
        }
    
        if (str === 'DEL') {
            input = input.slice(0, -1);
            this.setState({
                input
            });
            return false;
        }
    
        if (str === 'ANS') {
            input += lastResult;
            this.setState({
                input
            });
            return false;
        }
    
        if (str) {
            input += str;
            this.setState({
                input
            });
            return false;
        }

    }

    render() {
        return (
            <div>
                <DisplayScreen input={this.state.input} result={this.state.result} clickBtn={this.clickBtn}/>
                <Keyboard clickBtn={this.clickBtn}/>
            </div>
        );
    }
};

export default UseState;
