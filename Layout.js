import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import TodoList from './TodoList';
import LoginArea from './LoginArea';

const Layout = ({
  userInfo,
  setUserInfo,
  signupMode,
  toggleSignupMode,
}) => (
  <div>
    <h1>TODOs</h1>
    <LoginArea
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      signupMode={signupMode}
      toggleSignupMode={toggleSignupMode}
    />
    <TodoList userInfo={userInfo} />
  </div>
);

export default Layout;
