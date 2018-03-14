import React from 'react';
import ReactDOM from 'react-dom';
import AppCon from './container/app-container';
import FirstTimeApplicant from './components/FirstTimeApplicant/Landing';
import Reapply from './components/Reapply/Page1';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { HashRouter, Route } from 'react-router-dom';
import { reducer as formReducer } from 'redux-form';
import Header from './components/Header';


const store = createStore(combineReducers({
  reducers,
  form: formReducer
}), applyMiddleware(thunk));

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <Header />
          <Route exact path="/" component={AppCon} />
          <Route path="/apply" component={FirstTimeApplicant} />
          <Route exact path="/reapply" component={Reapply} />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// page 1 (App - has links to First time Applicant and ReApply pages)
