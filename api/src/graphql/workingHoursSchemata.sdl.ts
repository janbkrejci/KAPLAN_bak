export const schema = gql`
  """
  Representation of WorkingHoursSchema.
  """
  type WorkingHoursSchema {
    "Description for id."
    id: String!

    "Description for name."
    name: String!

    "Description for resourcekinds."
    resourcekinds: [ResourceKind]!

    "Description for monday."
    monday: Float!

    "Description for tuesday."
    tuesday: Float!

    "Description for wednesday."
    wednesday: Float!

    "Description for thursday."
    thursday: Float!

    "Description for friday."
    friday: Float!

    "Description for saturday."
    saturday: Float!

    "Description for sunday."
    sunday: Float!

    "Description for holidayIfWorkDay."
    holidayIfWorkDay: Float!

    "Description for holidayIfWeekend."
    holidayIfWeekend: Float!

    "Description for createdAt."
    createdAt: DateTime!

    "Description for updatedAt."
    updatedAt: DateTime
  }

  """
  About queries
  """
  type Query {
    "Fetch WorkingHoursSchemata."
    workingHoursSchemata: [WorkingHoursSchema!]! @requireAuth

    "Fetch a WorkingHoursSchema by id."
    workingHoursSchema(id: String!): WorkingHoursSchema @requireAuth
  }

  """
  Autogenerated input type of InputWorkingHoursSchema.
  """
  input CreateWorkingHoursSchemaInput {
    "Description for name."
    name: String!

    "Description for monday."
    monday: Float!

    "Description for tuesday."
    tuesday: Float!

    "Description for wednesday."
    wednesday: Float!

    "Description for thursday."
    thursday: Float!

    "Description for friday."
    friday: Float!

    "Description for saturday."
    saturday: Float!

    "Description for sunday."
    sunday: Float!

    "Description for holidayIfWorkDay."
    holidayIfWorkDay: Float!

    "Description for holidayIfWeekend."
    holidayIfWeekend: Float!
  }

  """
  Autogenerated input type of UpdateWorkingHoursSchema.
  """
  input UpdateWorkingHoursSchemaInput {
    "Description for name."
    name: String

    "Description for monday."
    monday: Float

    "Description for tuesday."
    tuesday: Float

    "Description for wednesday."
    wednesday: Float

    "Description for thursday."
    thursday: Float

    "Description for friday."
    friday: Float

    "Description for saturday."
    saturday: Float

    "Description for sunday."
    sunday: Float

    "Description for holidayIfWorkDay."
    holidayIfWorkDay: Float

    "Description for holidayIfWeekend."
    holidayIfWeekend: Float
  }

  """
  About mutations
  """
  type Mutation {
    "Creates a new WorkingHoursSchema."
    createWorkingHoursSchema(
      input: CreateWorkingHoursSchemaInput!
    ): WorkingHoursSchema! @requireAuth

    "Updates an existing WorkingHoursSchema."
    updateWorkingHoursSchema(
      id: String!
      input: UpdateWorkingHoursSchemaInput!
    ): WorkingHoursSchema! @requireAuth

    "Deletes an existing WorkingHoursSchema."
    deleteWorkingHoursSchema(id: String!): WorkingHoursSchema! @requireAuth
  }
`;
