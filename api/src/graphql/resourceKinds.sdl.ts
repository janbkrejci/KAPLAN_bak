export const schema = gql`
  type ResourceKind {
    id: String!
    name: String!
    hourlyCost: Float!
    Resources: [Resource]!
    createdAt: DateTime!
    updatedAt: DateTime!
    validResourceLeaveTypes: [ResourceLeaveType]!
  }

  type Query {
    resourceKinds: [ResourceKind!]! @requireAuth
    resourceKind(id: String!): ResourceKind @requireAuth
  }

  input CreateResourceKindInput {
    name: String!
    hourlyCost: Float!
  }

  input UpdateResourceKindInput {
    name: String
    hourlyCost: Float
  }

  type Mutation {
    createResourceKind(input: CreateResourceKindInput!): ResourceKind!
      @requireAuth
    updateResourceKind(
      id: String!
      input: UpdateResourceKindInput!
    ): ResourceKind! @requireAuth
    deleteResourceKind(id: String!): ResourceKind! @requireAuth
  }
`
