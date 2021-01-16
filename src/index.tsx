import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'

const client = new ApolloClient({
  uri: "https://spacexdata.herokuapp.com/graphql",
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client} >
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
