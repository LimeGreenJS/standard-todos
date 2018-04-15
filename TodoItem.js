import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { QUERY_ALL_TASKS, getQueryAllTasksVariables } from './TodoList';

const DELETE_TASK = gql`
mutation deleteTask($id: ID!) {
  deleteTask(id: $id) {
    id
  }
}
`;

const TodoItem = ({ userInfo, item }) => (
  <Mutation
    mutation={DELETE_TASK}
    update={(cache, { data: { deleteTask } }) => {
      const variables = getQueryAllTasksVariables(userInfo);
      const data = cache.readQuery({ query: QUERY_ALL_TASKS, variables });
      const index = data.allTasks.findIndex(task => task.id === deleteTask.id);
      if (index >= 0) {
        data.allTasks.splice(index, 1);
        cache.writeQuery({ query: QUERY_ALL_TASKS, variables, data });
      }
    }}
  />
    {(deleteTask) => {
      const onClick = (event) => {
        deleteTask({ variables: { id: item.id } });
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
    }}
  </Mutation>
);

export default TodoItem;
