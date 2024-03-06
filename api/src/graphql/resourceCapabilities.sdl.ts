export const schema = gql`
  type ResourceCapability {
    id: String!
    name: String!
    resources: [Resource]!
    createdAt: DateTime!
    updatedAt: DateTime!
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
