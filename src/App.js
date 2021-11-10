import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import HomePage from './pages/homepage/homepage';
import Header from './components/header/header.component'
function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
          <Route exact path='/' component={HomePage}/>
      </Switch>
    </div>
  );
}

export default App;
