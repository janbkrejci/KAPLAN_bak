export const schema = gql`
input GetResourcesWithAllocationsInput {
  from: String
  to: String
  organizationalUnitIds: [String!]
  resourceCapabilityIds: [String!]
  resourceKindIds: [String!]
}

type ResourcesWithAllocations {
  from: String
  to: String
  resources: [ResourceWithAllocations!]!
}

type ResourceWithAllocations {
  resource: Resource!
  dailyCapacities: [DailyCapacity!]!
}

type DailyCapacity {
  date: String!
  capacity: Int!
}

type Query {
  resourcesWithAllocations(args: GetResourcesWithAllocationsInput): ResourceWithAllocations! @requireAuth
}
`
