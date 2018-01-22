import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import TodoItem from './TodoItem';

const TodoList = ({ userInfo, data: { loading, error, allTasks } }) => (
  loading ? <p>Loading...</p> :
  error ? <p>Error: {error.message}</p> : (
    <ul>
      {allTasks.map(task => (
        <li
          key={task.id}
          className={task.private && 'private' || ''}
        >
          <TodoItem userInfo={userInfo} item={task} />
        </li>
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
    private
  }
}
`;

export const getQueryAllTasksVariables = userInfo => ({
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
});

const config = {
  options: ({ userInfo }) => ({
    variables: getQueryAllTasksVariables(userInfo),
  }),
};

export default graphql(QUERY_ALL_TASKS, config)(TodoList);
