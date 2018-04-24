import React from 'react';
import ReactDOM from 'react-dom';
import AppCon from './container/app-container';
import WizardForm from './components/FirstTimeApplicant/WizardForm';
// import Page2 from './components/FirstTimeApplicant/Page2';
// import Page3 from './components/FirstTimeApplicant/Page3';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { HashRouter, Route } from 'react-router-dom';
import { reducer as formReducer } from 'redux-form';
import Header from './components/Header';
import Footer from './components/Footer';
// import WizardFormThirdPage from './components/FirstTimeApplicant/WizardFormThirdPage';
// import WizardFormFirstPage from './components/FirstTimeApplicant/WizardFormFirstPage';
// import WizardFormSecondPage from './components/FirstTimeApplicant/WizardFormSecondPage';


const store = createStore(combineReducers({
  reducers,
  form: formReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// }), applyMiddleware(thunk));

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <Header />
          <main>
            <Route exact={true} path="/" component={WizardForm} />
            {/* <Route path="/apply" component={WizardFormSecondPage} store={store} /> */}
            {/* <Route path="/apply" render={()=><WizardFormSecondPage store={store}/>} /> */}
            {/* <Route path="/complete" component={WizardFormThirdPage} /> */}
            {/* <Route path="/apply" component={WizardForm} /> */}
            {/* <Route path="/page2" component={Page2} />
            <Route path="/page3" component={Page3} /> */}
          </main>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
