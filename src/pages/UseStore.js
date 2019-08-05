import React from 'react';
import { connect } from 'react-redux';
import DisplayScreen from '../components/DisplayScreen/index.js';
import Keyboard from '../components/Keyboard/index.js';

const UseStore = (props) => {
	const {
		input,
		input2,
		result,
		clickBtn
	} = props;

	return (
		<div>
			<DisplayScreen input={input} input2={input2} result={result} clickBtn={clickBtn} />
			<Keyboard clickBtn={clickBtn} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return state;
};

const mapReducerToProps = (dispatch) => {
	return {
		clickBtn(str) {
			const action = {
				type: 'click_btn',
				btnContent: str
			};
			dispatch(action);
		}
	}
};
// export default UseStore
export default connect(mapStateToProps, mapReducerToProps)(UseStore);
