import React from 'react';
import { connect } from 'react-redux';
import DisplayScreen from './components/DisplayScreen/index.js';
import Keyboard from './components/Keyboard/index.js';
import './App.less';

const App = (props) => {
  const {
    input,
    result,
    clickBtn
  } = props;

  return (
    <div className="app">
      <DisplayScreen input={input} result={result} clickBtn={clickBtn}/>
      <Keyboard clickBtn={clickBtn}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapReducerToProps = (dispatch) => {
  return {
    clickBtn(e) {
      const str = e.target.innerHTML;
      const action = {
        type: 'click_btn',
        btnContent: str
      };
      dispatch(action);
    }
  }
};

export default connect(mapStateToProps, mapReducerToProps)(App);
