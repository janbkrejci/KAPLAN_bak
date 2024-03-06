export const schema = gql`
  type ResourceLeave {
    id: String!
    description: String
    from: DateTime!
    to: DateTime!
    firstDayWorkingHours: Float!
    lastDayWorkingHours: Float!
    resourceLeaveApprovalStateId: String!
    resourceLeaveType: ResourceLeaveType!
    resourceLeaveTypeId: String!
    resource: Resource!
    resourceId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    resourceLeaves: [ResourceLeave!]! @requireAuth
    resourceLeave(id: String!): ResourceLeave @requireAuth
  }

  input CreateResourceLeaveInput {
    description: String
    from: DateTime!
    to: DateTime!
    firstDayWorkingHours: Float!
    lastDayWorkingHours: Float!
    resourceLeaveApprovalStateId: String!
    resourceLeaveTypeId: String!
    resourceId: String!
  }

  input UpdateResourceLeaveInput {
    description: String
    from: DateTime
    to: DateTime
    firstDayWorkingHours: Float
    lastDayWorkingHours: Float
    resourceLeaveApprovalStateId: String
    resourceLeaveTypeId: String
    resourceId: String
  }

  type Mutation {
    createResourceLeave(input: CreateResourceLeaveInput!): ResourceLeave!
      @requireAuth
    updateResourceLeave(
      id: String!
      input: UpdateResourceLeaveInput!
    ): ResourceLeave! @requireAuth
    deleteResourceLeave(id: String!): ResourceLeave! @requireAuth
  }
`
