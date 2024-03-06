export const schema = gql`
  type ResourceLeaveApprovalState {
    id: String!
    order: Int!
    name: String!
    resourceLeaves: [ResourceLeave]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    resourceLeaveApprovalStates: [ResourceLeaveApprovalState!]! @requireAuth
    resourceLeaveApprovalState(id: String!): ResourceLeaveApprovalState
      @requireAuth
  }

  input CreateResourceLeaveApprovalStateInput {
    order: Int!
    name: String!
  }

  input UpdateResourceLeaveApprovalStateInput {
    order: Int
    name: String
  }

  type Mutation {
    createResourceLeaveApprovalState(
      input: CreateResourceLeaveApprovalStateInput!
    ): ResourceLeaveApprovalState! @requireAuth
    updateResourceLeaveApprovalState(
      id: String!
      input: UpdateResourceLeaveApprovalStateInput!
    ): ResourceLeaveApprovalState! @requireAuth
    deleteResourceLeaveApprovalState(id: String!): ResourceLeaveApprovalState!
      @requireAuth
  }
`
