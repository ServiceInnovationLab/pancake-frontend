import React from 'react';
import ReactDOM from 'react-dom';
import AppCon from './container/app-container';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { HashRouter, Route } from 'react-router-dom';
import { reducer as formReducer } from 'redux-form';

const store = createStore(combineReducers({
  reducers,
  form: formReducer
}), applyMiddleware(thunk));

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={AppCon} />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
