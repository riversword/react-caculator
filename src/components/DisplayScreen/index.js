import React from 'react';
import './style.less';

const DisplayScreen = (props)=> {
    const {
        input,
        result,
        clickBtn
    } = props;
    return (
        <div className={'caculator-body'}>
            <div className={'display-screen'}>
                <div className={'input'}>{input}</div>
                <div className={'result'}>{result}</div>
            </div>
            <div onClick={clickBtn} className={'btn-equal'}>=</div>
        </div>
    );
}


export default DisplayScreen;
