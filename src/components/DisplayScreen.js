import React from 'react';

const DisplayScreen = (props)=> {
    const {
        input,
        result
    } = props;
    return (
        <div className={'display-screen'}>
            <div className={'input'}>{input}</div>
            <div className={'result'}>{result}</div>
        </div>
    );
}


export default DisplayScreen;
