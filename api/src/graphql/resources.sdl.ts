export const schema = gql`
  """
  Representation of Resource.
  """
  type Resource {
    "Description for id."
    id: String!

    "Description for name."
    name: String!

    "Description for resourceKind."
    resourceKind: ResourceKind!

    "Description for resourceKindId."
    resourceKindId: String!

    "Description for resourceCapabilities."
    resourceCapabilities: [ResourceCapability]!

    "Description for activeSince."
    activeSince: DateTime!

    "Description for activeUntil."
    activeUntil: DateTime

    "Description for resourceLeaves."
    resourceLeaves: [ResourceLeave]!

    "Description for resourceAvailabilityOverrides."
    resourceAvailabilityOverrides: [ResourceAvailabilityOverride]!

    "Description for organizationalUnit."
    organizationalUnit: OrganizationalUnit!

    "Description for organizationalUnitId."
    organizationalUnitId: String!

    "Description for createdAt."
    createdAt: DateTime!

    "Description for updatedAt."
    updatedAt: DateTime!
  }

  """
  About queries
  """
  type Query {
    "Fetch Resources."
    resources: [Resource!]! @requireAuth

    "Fetch a Resource by id."
    resource(id: String!): Resource @requireAuth
  }

  """
  Autogenerated input type of InputResource.
  """
  input CreateResourceInput {
    "Description for name."
    name: String!

    "Description for resourceKindId."
    resourceKindId: String!

    "Description for activeSince."
    activeSince: DateTime!

    "Description for activeUntil."
    activeUntil: DateTime

    "Description for organizationalUnitId."
    organizationalUnitId: String!
  }

  """
  Autogenerated input type of UpdateResource.
  """
  input UpdateResourceInput {
    "Description for name."
    name: String

    "Description for resourceKindId."
    resourceKindId: String

    "Description for activeSince."
    activeSince: DateTime

    "Description for activeUntil."
    activeUntil: DateTime

    "Description for organizationalUnitId."
    organizationalUnitId: String
  }

  """
  About mutations
  """
  type Mutation {
    "Creates a new Resource."
    createResource(input: CreateResourceInput!): Resource! @requireAuth

    "Updates an existing Resource."
    updateResource(id: String!, input: UpdateResourceInput!): Resource!
      @requireAuth

    "Deletes an existing Resource."
    deleteResource(id: String!): Resource! @requireAuth
  }
`;
