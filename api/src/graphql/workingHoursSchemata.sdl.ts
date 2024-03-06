export const schema = gql`
  type WorkingHoursSchema {
    id: String!
    name: String!
    monday: Float!
    tuesday: Float!
    wednesday: Float!
    thursday: Float!
    friday: Float!
    saturday: Float!
    sunday: Float!
    holidayIfWorkDay: Float!
    holidayIfWeekend: Float!
    resources: [Resource]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    workingHoursSchemata: [WorkingHoursSchema!]! @requireAuth
    workingHoursSchema(id: String!): WorkingHoursSchema @requireAuth
  }

  input CreateWorkingHoursSchemaInput {
    name: String!
    monday: Float!
    tuesday: Float!
    wednesday: Float!
    thursday: Float!
    friday: Float!
    saturday: Float!
    sunday: Float!
    holidayIfWorkDay: Float!
    holidayIfWeekend: Float!
  }

  input UpdateWorkingHoursSchemaInput {
    name: String
    monday: Float
    tuesday: Float
    wednesday: Float
    thursday: Float
    friday: Float
    saturday: Float
    sunday: Float
    holidayIfWorkDay: Float
    holidayIfWeekend: Float
  }

  type Mutation {
    createWorkingHoursSchema(
      input: CreateWorkingHoursSchemaInput!
    ): WorkingHoursSchema! @requireAuth
    updateWorkingHoursSchema(
      id: String!
      input: UpdateWorkingHoursSchemaInput!
    ): WorkingHoursSchema! @requireAuth
    deleteWorkingHoursSchema(id: String!): WorkingHoursSchema! @requireAuth
  }
`
