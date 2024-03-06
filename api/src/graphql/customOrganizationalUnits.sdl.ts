export const schema = gql`
type Query {
  parentOrganizationalUnits: [OrganizationalUnit!]! @requireAuth
}
`
