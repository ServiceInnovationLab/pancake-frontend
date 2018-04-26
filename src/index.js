import React from 'react';
import ReactDOM from 'react-dom';
import WizardForm from './components/FirstTimeApplicant/WizardForm';
import Sign from './components/FirstTimeApplicant/Sign';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { HashRouter, Route } from 'react-router-dom';
import { reducer as formReducer } from 'redux-form';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';


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
            <Route exact={true} path="/" component={WizardForm} />
            <Route path="/:id" component={Sign}/>
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
