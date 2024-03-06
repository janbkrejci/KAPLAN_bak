export const schema = gql`
  type ResourceLeaveType {
    id: String!
    name: String!
    resourceLeaves: [ResourceLeave]!
    createdAt: DateTime!
    updatedAt: DateTime!
    validForResourceKinds: [ResourceKind]!
  }

  type Query {
    resourceLeaveTypes: [ResourceLeaveType!]! @requireAuth
    resourceLeaveType(id: String!): ResourceLeaveType @requireAuth
  }

  input CreateResourceLeaveTypeInput {
    name: String!
  }

  input UpdateResourceLeaveTypeInput {
    name: String
  }

  type Mutation {
    createResourceLeaveType(
      input: CreateResourceLeaveTypeInput!
    ): ResourceLeaveType! @requireAuth
    updateResourceLeaveType(
      id: String!
      input: UpdateResourceLeaveTypeInput!
    ): ResourceLeaveType! @requireAuth
    deleteResourceLeaveType(id: String!): ResourceLeaveType! @requireAuth
  }
`
