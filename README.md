# standard-todos
LimeGreenJS-enabled standard todos example

## Graphcool schema
At first, you need to enable Email-Password Auth integration.
```
type Task @model {
  id: ID! @isUnique
  createdAt: DateTime!
  title: String!
  description: String
  private: Boolean
  owner: User @relation(name: "TaskOnUser")
}

type File @model {
  contentType: String!
  createdAt: DateTime!
  id: ID! @isUnique
  name: String!
  secret: String! @isUnique
  size: Int!
  updatedAt: DateTime!
  url: String! @isUnique
}

type User @model {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
  email: String @isUnique
  password: String
  tasks: [Task!]! @relation(name: "TaskOnUser")
}
```

## Graphcool permission queries for Task
### Read permission for Everyone
```
query ($node_id: ID!) {
  SomeTaskExists(
    filter: {
      id: $node_id
      OR: [{
        private: false
      }, {
        private: null
      }]
    }
  )
}
```
### Update/Delete permisson for Everyone
```
query ($node_id: ID!) {
  SomeTaskExists(
    filter: {
      id: $node_id
      owner: null
    }
  )
}
```
### Read permission for Authenticated
```
query ($node_id: ID!, $user_id: ID!) {
  SomeTaskExists(
    filter: {
      id: $node_id
      owner: {
        id: $user_id
      }
    }
  )
}
```
### Update/Delete permission for Authenticated
```
query ($node_id: ID!, $user_id: ID!) {
  SomeTaskExists(
    filter: {
      id: $node_id
      owner: {
        id: $user_id
      }
    }
  )
}
```
