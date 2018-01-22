import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import LoginArea from './LoginArea';
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';

const Layout = ({
  userInfo,
  setUserInfo,
  signupMode,
  toggleSignupMode,
}) => (
  <div className="container">
    <header>
      <h1>TODOs</h1>
      <LoginArea
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        signupMode={signupMode}
        toggleSignupMode={toggleSignupMode}
      />
      <div style={{ marginTop: 5, borderBottom: '1px solid lightgrey' }} />
      <NewTodoForm userInfo={userInfo} />
    </header>
    <TodoList userInfo={userInfo} />
  </div>
);

export default Layout;
