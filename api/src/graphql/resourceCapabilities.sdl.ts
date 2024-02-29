export const schema = gql`
  type ResourceCapability {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    resources: [Resource]!
  }

  type Query {
    resourceCapabilities: [ResourceCapability!]! @requireAuth
    resourceCapability(id: String!): ResourceCapability @requireAuth
  }

  input CreateResourceCapabilityInput {
    name: String!
  }

  input UpdateResourceCapabilityInput {
    name: String
  }

  type Mutation {
    createResourceCapability(
      input: CreateResourceCapabilityInput!
    ): ResourceCapability! @requireAuth
    updateResourceCapability(
      id: String!
      input: UpdateResourceCapabilityInput!
    ): ResourceCapability! @requireAuth
    deleteResourceCapability(id: String!): ResourceCapability! @requireAuth
  }
`
