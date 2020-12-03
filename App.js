import NavigationContainer from './src/screens';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
    );
  }
}

export default App;
