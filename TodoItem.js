import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { QUERY_ALL_TASKS, getQueryAllTasksVariables } from './TodoList';

const TodoItem = ({ userInfo, item, mutate }) => {
  const onClick = (event) => {
    mutate({ variables: { id: item.id } });
  };
  const { id } = userInfo || {};
  return (
    <div>
      {(!item.owner || item.owner.id === id) &&
        <button className="delete" onClick={onClick}>&times;</button>}
      {item.owner && <strong>{item.owner.email}&nbsp;</strong>}
      {item.title} - {item.description}
    </div>
  );
};

const DELETE_TASK = gql`
mutation deleteTask($id: ID!) {
  deleteTask(id: $id) {
    id
  }
}
`;

const config = {
  options: ({ userInfo }) => {
    const variables = getQueryAllTasksVariables(userInfo);
    return {
      update: (proxy, { data: { deleteTask } }) => {
        const data = proxy.readQuery({ query: QUERY_ALL_TASKS, variables });
        const index = data.allTasks.findIndex(task => task.id === deleteTask.id);
        if (index >= 0) {
          data.allTasks.splice(index, 1);
          proxy.writeQuery({ query: QUERY_ALL_TASKS, variables, data });
        }
      },
    };
  },
};

export default graphql(DELETE_TASK, config)(TodoItem);
