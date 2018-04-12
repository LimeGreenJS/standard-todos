import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGNUP = gql`
mutation signup($email: String!, $password: String!) {
  createUser(authProvider: { email: { email: $email, password: $password } }) {
    email
  }
}
`;

const SignupForm = ({ mutate, toggleSignupMode }) => (
  <Mutation mutation={SIGNUP}>
    {(signup) => {
      const onClick = async (event) => {
        event.preventDefault();
        const email = event.target.parentNode.email.value;
        if (!email) return;
        const password = event.target.parentNode.password.value;
        if (!password) return;
        try {
          await signup({ variables: { email, password } });
          window.alert('Signup done. Please log in.');
          toggleSignupMode();
        } catch(e) {
          console.error(e);
          window.alert('Signup failed. Please see console log.');
        }
      };
      return (
        <form>
          <input name="email" placeholder="Email for Sign Up" />
          <input type="password" name="password" placeholder="Password for Sign Up" />
          <button type="submit" onClick={onClick}>Sign Up</button>
        </form>
      );
    }}
  </Mutation>
);

export default SignupForm;
