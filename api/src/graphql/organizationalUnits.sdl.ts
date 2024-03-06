export const schema = gql`
  type OrganizationalUnit {
    id: String!
    code: String!
    name: String!
    description: String
    parentOrganizationalUnit: OrganizationalUnit
    parentOrganizationalUnitId: String
    childOrganizationalUnits: [OrganizationalUnit]!
    resources: [Resource]!
  }

  type Query {
    organizationalUnits: [OrganizationalUnit!]! @requireAuth
    organizationalUnit(id: String!): OrganizationalUnit @requireAuth
  }

  input CreateOrganizationalUnitInput {
    code: String!
    name: String!
    description: String
    parentOrganizationalUnitId: String
  }

  input UpdateOrganizationalUnitInput {
    code: String
    name: String
    description: String
    parentOrganizationalUnitId: String
  }

  type Mutation {
    createOrganizationalUnit(
      input: CreateOrganizationalUnitInput!
    ): OrganizationalUnit! @requireAuth
    updateOrganizationalUnit(
      id: String!
      input: UpdateOrganizationalUnitInput!
    ): OrganizationalUnit! @requireAuth
    deleteOrganizationalUnit(id: String!): OrganizationalUnit! @requireAuth
  }
`
