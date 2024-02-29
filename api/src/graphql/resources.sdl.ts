export const schema = gql`
  type Resource {
    id: ID!
    name: String!
    parent: Resource
    parentId: String
    children: [Resource]!
    capabilities: [ResourceCapability]!
    kind: ResourceKind!
    kindId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    resources: [Resource!]! @requireAuth
    resource(id: String!): Resource @requireAuth
  }

  input CreateResourceInput {
    name: String!
    parentId: String
    kindId: String!
  }

  input UpdateResourceInput {
    name: String
    parentId: String
    kindId: String
  }

  type Mutation {
    createResource(input: CreateResourceInput!): Resource! @requireAuth
    updateResource(id: String!, input: UpdateResourceInput!): Resource!
      @requireAuth
    deleteResource(id: String!): Resource! @requireAuth
  }
`
