export const schema = gql`
  """
  Representation of OrganizationalUnit.
  """
  type OrganizationalUnit {
    "Description for id."
    id: String!

    "Description for code."
    code: String!

    "Description for name."
    name: String!

    "Description for description."
    description: String

    "Description for parentOrganizationalUnit."
    parentOrganizationalUnit: OrganizationalUnit

    "Description for parentOrganizationalUnitId."
    parentOrganizationalUnitId: String

    "Description for childOrganizationalUnits."
    childOrganizationalUnits: [OrganizationalUnit]!

    "Description for resources."
    resources: [Resource]!

    "Description for createdAt."
    createdAt: DateTime!

    "Description for updatedAt."
    updatedAt: DateTime
  }

  """
  About queries
  """
  type Query {
    "Fetch OrganizationalUnits."
    organizationalUnits: [OrganizationalUnit!]! @requireAuth

    "Fetch a OrganizationalUnit by id."
    organizationalUnit(id: String!): OrganizationalUnit @requireAuth
  }

  """
  Autogenerated input type of InputOrganizationalUnit.
  """
  input CreateOrganizationalUnitInput {
    "Description for code."
    code: String!

    "Description for name."
    name: String!

    "Description for description."
    description: String

    "Description for parentOrganizationalUnitId."
    parentOrganizationalUnitId: String
  }

  """
  Autogenerated input type of UpdateOrganizationalUnit.
  """
  input UpdateOrganizationalUnitInput {
    "Description for code."
    code: String

    "Description for name."
    name: String

    "Description for description."
    description: String

    "Description for parentOrganizationalUnitId."
    parentOrganizationalUnitId: String
  }

  """
  About mutations
  """
  type Mutation {
    "Creates a new OrganizationalUnit."
    createOrganizationalUnit(
      input: CreateOrganizationalUnitInput!
    ): OrganizationalUnit! @requireAuth

    "Updates an existing OrganizationalUnit."
    updateOrganizationalUnit(
      id: String!
      input: UpdateOrganizationalUnitInput!
    ): OrganizationalUnit! @requireAuth

    "Deletes an existing OrganizationalUnit."
    deleteOrganizationalUnit(id: String!): OrganizationalUnit! @requireAuth
  }
`;
