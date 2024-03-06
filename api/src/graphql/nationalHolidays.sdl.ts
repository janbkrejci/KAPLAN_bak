export const schema = gql`
  type NationalHoliday {
    id: String!
    name: String!
    day: Int!
    month: Int!
    year: Int
  }

  type Query {
    nationalHolidays: [NationalHoliday!]! @requireAuth
    nationalHoliday(id: String!): NationalHoliday @requireAuth
  }

  input CreateNationalHolidayInput {
    name: String!
    day: Int!
    month: Int!
    year: Int
  }

  input UpdateNationalHolidayInput {
    name: String
    day: Int
    month: Int
    year: Int
  }

  type Mutation {
    createNationalHoliday(input: CreateNationalHolidayInput!): NationalHoliday!
      @requireAuth
    updateNationalHoliday(
      id: String!
      input: UpdateNationalHolidayInput!
    ): NationalHoliday! @requireAuth
    deleteNationalHoliday(id: String!): NationalHoliday! @requireAuth
  }
`
