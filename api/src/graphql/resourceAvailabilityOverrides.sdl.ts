export const schema = gql`
  type ResourceAvailabilityOverride {
    id: String!
    description: String!
    dateFrom: DateTime
    dateTo: DateTime
    dailyHoursAvailable: Float!
    resources: [Resource]!
  }

  type Query {
    resourceAvailabilityOverrides: [ResourceAvailabilityOverride!]! @requireAuth
    resourceAvailabilityOverride(id: String!): ResourceAvailabilityOverride
      @requireAuth
  }

  input CreateResourceAvailabilityOverrideInput {
    description: String!
    dateFrom: DateTime
    dateTo: DateTime
    dailyHoursAvailable: Float!
  }

  input UpdateResourceAvailabilityOverrideInput {
    description: String
    dateFrom: DateTime
    dateTo: DateTime
    dailyHoursAvailable: Float
  }

  type Mutation {
    createResourceAvailabilityOverride(
      input: CreateResourceAvailabilityOverrideInput!
    ): ResourceAvailabilityOverride! @requireAuth
    updateResourceAvailabilityOverride(
      id: String!
      input: UpdateResourceAvailabilityOverrideInput!
    ): ResourceAvailabilityOverride! @requireAuth
    deleteResourceAvailabilityOverride(
      id: String!
    ): ResourceAvailabilityOverride! @requireAuth
  }
`
