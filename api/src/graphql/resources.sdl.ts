export const schema = gql`
  type Resource {
    id: String!
    name: String!
    manager: Resource
    managerId: String
    subordinates: [Resource]!
    resourceCapabilities: [ResourceCapability]!
    resourceKind: ResourceKind!
    resourceKindId: String!
    activeSince: DateTime!
    activeUntil: DateTime
    workingHoursSchema: WorkingHoursSchema!
    workingHoursSchemaId: String!
    resourceLeaves: [ResourceLeave]!
    resourceAvailabilityOverrides: [ResourceAvailabilityOverride]!
    organizationalUnit: OrganizationalUnit!
    organizationalUnitId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    resources: [Resource!]! @requireAuth
    resource(id: String!): Resource @requireAuth
  }

  input CreateResourceInput {
    name: String!
    managerId: String
    resourceKindId: String!
    activeSince: DateTime!
    activeUntil: DateTime
    workingHoursSchemaId: String!
    organizationalUnitId: String!
  }

  input UpdateResourceInput {
    name: String
    managerId: String
    resourceKindId: String
    activeSince: DateTime
    activeUntil: DateTime
    workingHoursSchemaId: String
    organizationalUnitId: String
  }

  type Mutation {
    createResource(input: CreateResourceInput!): Resource! @requireAuth
    updateResource(id: String!, input: UpdateResourceInput!): Resource!
      @requireAuth
    deleteResource(id: String!): Resource! @requireAuth
  }
`
