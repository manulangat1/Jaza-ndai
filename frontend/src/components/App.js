import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// store
import store from '../store'
import { Provider } from 'react-redux'

class App extends React.Component {
render() {
   return (
       <Provider store={store}>
       <main>
           <h1>manu</h1>
       </main>
       </Provider>
   )
}
}
ReactDOM.render(<App />, document.getElementById('App'));