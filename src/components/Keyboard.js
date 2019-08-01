import React from 'react';

const Keyboard = (props) => {
	const btns = [
		'C', '%', 'M', '^',
		'7', '8', '9', '+',
		'4', '5', '6', '-',
		'1', '2', '3', '×',
		'0', 'oo', '.', '÷' 
	];
	const clickBtn = props.clickBtn;
    return (
		<div className={'keyboard-container'}>
			<div className={'keyboard'} onClick={clickBtn}>
				{
					btns.map((item, index) => {
						return (
							<div className={'keyboard-btn'} key={index} >{item}</div>
						)
					})
				}
			</div>
			<div className={'btn-equal'}>=</div>
		</div>
    )
}

export default Keyboard