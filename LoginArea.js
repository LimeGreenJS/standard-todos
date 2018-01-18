import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { GRAPHCOOL_TOKEN } from './App';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

class LoginArea extends React.PureComponent {
  constructor() {
    super();
    this.doLogout = this.doLogout.bind(this);
  }
  componentDidUpdate() {
    const {
      userInfo,
      setUserInfo,
      data: { user },
    } = this.props;
    if (user && user.email && (!userInfo || user.email !== userInfo.email)) {
      setUserInfo(user);
    }
  }
  doLogout() {
    const {
      setUserInfo,
    } = this.props;
    localStorage.removeItem(GRAPHCOOL_TOKEN);
    setUserInfo(null);
  }
  render() {
    const {
      userInfo,
      setUserInfo,
      signupMode,
      toggleSignupMode,
      data: { loading },
    } = this.props;
    if (loading) return <p>Cheking login...</p>;
    if (userInfo) {
      return (
        <div>
          Login as: {userInfo.email}
          <button onClick={this.doLogout}>Log Out</button>
        </div>
      );
    }
    if (signupMode) return <SignupForm toggleSignupMode={toggleSignupMode} />;
    return (
      <LoginForm
        setUserInfo={setUserInfo}
        signupMode={signupMode}
        toggleSignupMode={toggleSignupMode}
      />
    );
  }
};

const USER = gql`
{
  user {
    email
    id
  }
}
`;

export default graphql(USER)(LoginArea);
