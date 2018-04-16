import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import TodoItem from './TodoItem';

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

const TodoList = ({ userInfo }) => (
  <Query
    query={QUERY_ALL_TASKS}
    variables={getQueryAllTasksVariables(userInfo)}
  >
    {({ loading, error, data }) => (
      loading ? <p>Loading...</p> :
      error ? <p>Error: {error.message}</p> : (
        <ul>
          {data.allTasks.map(task => (
            <li
              key={task.id}
              className={task.private && 'private' || ''}
            >
              <TodoItem userInfo={userInfo} item={task} />
            </li>
          ))}
        </ul>
      )
    )}
  </Query>
);

export default TodoList;
