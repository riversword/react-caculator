import React from 'react';
import './style.less';

const DisplayScreen = (props)=> {
    const {
        input,
        input2,
        // result,
        clickBtn
    } = props;
    return (
        <div className={'caculator-body'}>
            <div className={'display-screen'}>
                <div className={'input'}>{input}</div>
                <div className={'result'}>{input2}</div>
            </div>
            <div onClick={() => {
                clickBtn('=');
            }} className={'btn-equal'}>=</div>
        </div>
    );
}


export default DisplayScreen;
