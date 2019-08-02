import React from 'react';
import UseStore from './pages/UseStore.js';
import UseState from './pages/UseState.js';
import './App.less';
import {HashRouter , Route , Link, Switch} from 'react-router-dom';

const App = (props) => {

  return (
    <div className="app">
      <HashRouter>
        <div>
          <Link className={'link'} to="/">to store</Link>
          <Link className={'link'} to="/state">to state</Link>
          <Switch>
          {/* exact={true} 精确匹配路由 */}
            <Route exact={true} path="/" component={UseStore}/>
            <Route path="/state" component={UseState}/>
          </Switch>
        </div>
      </HashRouter>
    </div>
  )
};

export default App;
