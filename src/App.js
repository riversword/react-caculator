import React from 'react';
import { connect } from 'react-redux';
import DisplayScreen from './components/DisplayScreen';
import Keyboard from './components/Keyboard';
import './App.less';

const App = (props) => {
  const {
    input,
    result,
    clickBtn
  } = props;

  return (
    <div className="app">
      <DisplayScreen input={input} result={result}/>
      <Keyboard clickBtn={clickBtn}/>
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

// export default App;

export default connect(mapStateToProps, mapReducerToProps)(App);
