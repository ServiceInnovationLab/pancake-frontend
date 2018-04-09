import React from 'react';
import ReactDOM from 'react-dom';
import AppCon from './container/app-container';
import FirstTimeApplicant from './components/FirstTimeApplicant/Landing';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { HashRouter, Route } from 'react-router-dom';
import { reducer as formReducer } from 'redux-form';
import Header from './components/Header';
import Footer from './components/Footer';


const store = createStore(combineReducers({
  reducers,
  form: formReducer
// }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}), applyMiddleware(thunk));

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <Header />
          <main>
            <Route exact path="/" component={AppCon} />
            <Route path="/apply" component={FirstTimeApplicant} />
          </main>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
