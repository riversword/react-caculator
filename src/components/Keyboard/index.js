import React from 'react';
import './style.less';

class Keyboard extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			btns: [
				'C', 'mc', 'm+', 'm-', 'mr',
				'(', ')', '+/-', '%', '^', 
				'7', '8', '9', '+', '-',
				'4', '5', '6', '×', '÷',
				'1', '2', '3', '0', '.'
			]
		};

		this.clickBtn.bind(this);
	}

	clickBtn(item, index) {
		this.props.clickBtn(item);
		let { btns } = this.state;
		if (item === 'C' || item === 'AC') {
			btns[index] = 'AC';
		} else {
			btns[0] = 'C';
		}
		this.setState({
			btns: btns
		});
	}

    render() {
		return (
			<div className={'keyboard-container'}>
				<ul className={'keyboard'}>
					{
						this.state.btns.map((item, index) => {
							return (
								<li className={'keyboard-btn'} key={index} onClick={(event) => {
									this.clickBtn(item, index);
								}}>{item}</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

export default Keyboard
