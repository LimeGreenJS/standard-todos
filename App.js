import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import Layout from './Layout';

export const GRAPHCOOL_TOKEN = 'GRAPHCOOL_TOKEN';

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem(GRAPHCOOL_TOKEN)}`
    }
  });
  return forward(operation);
});
const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjc414ya52c030130vphioksx',
});
const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      userInfo: null,
      signupMode: false,
    };
    this.setUserInfo = (userInfo) => {
      this.setState({ userInfo });
    };
    this.toggleSignupMode = () => {
      this.setState({ signupMode: !this.state.signupMode });
    };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Layout
          userInfo={this.state.userInfo}
          setUserInfo={this.setUserInfo}
          signupMode={this.state.signupMode}
          toggleSignupMode={this.toggleSignupMode}
        />
      </ApolloProvider>
    )
  }
}

export default App;
