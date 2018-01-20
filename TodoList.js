import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import TodoItem from './TodoItem';
import NewTodoForm from './NewTodoForm';

const TodoList = ({ userInfo, data: { loading, error, allTasks } }) => (
  loading ? <p>Loading...</p> :
  error ? <p>Error: {error.message}</p> : (
    <ul>
      <li><NewTodoForm userInfo={userInfo} /></li>
      {allTasks.map(task => (
        <li key={task.id}><TodoItem userInfo={userInfo} item={task} /></li>
      ))}
    </ul>
  )
);

export const QUERY_ALL_TASKS = gql`
query queryTasks($filter: TaskFilter){
  allTasks(filter: $filter, orderBy: createdAt_DESC) {
    id
    title
    description
    owner {
      email
      id
    }
  }
}
`;

const config = {
  options: ({ userInfo }) => ({
    variables: {
      filter: {
        OR: [{
          private: false,
        }, {
          private: null,
        }, {
          private: true,
          owner: {
            id: userInfo && userInfo.id,
          },
        }],
      },
    },
  }),
};

export default graphql(QUERY_ALL_TASKS, config)(TodoList);
