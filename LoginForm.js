import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { GRAPHCOOL_TOKEN } from './App';

const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  signinUser(email: { email: $email, password: $password }) {
    token
    user {
      email
      id
    }
  }
}
`;

const LoginForm = ({ setUserInfo, signupMode, toggleSignupMode }) => (
  <Mutation mutation={LOGIN}>
    {(login) => {
      const onClick = async (event) => {
        event.preventDefault();
        const email = event.target.parentNode.email.value;
        if (!email) return;
        const password = event.target.parentNode.password.value;
        if (!password) return;
        try {
          const { data } = await login({ variables: { email, password } });
          const { signinUser: { token, user } } = data;
          localStorage.setItem(GRAPHCOOL_TOKEN, token);
          setUserInfo(user);
        } catch(e) {
          console.error(e);
          window.alert('Login failed. Please see console log.');
        }
      };
      return (
        <form>
          <input name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" onClick={onClick}>Log In</button>
          <a href="#" onClick={toggleSignupMode}>Sign Up</a>
        </form>
      );
    }}
  </Mutation>
);

export default LoginForm;
