export const schema = gql`
  enum DayOfWeek {
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
    SUNDAY
  }

  enum DayType {
    WORKING_DAY
    WEEKEND
    HOLIDAY_WORKING_DAY
    HOLIDAY_WEEKEND
  }

  type Calendar {
    day: Int!
    month: Int!
    year: Int!
    dayOfWeek: DayOfWeek!
    dayType: DayType!
    holiday: NationalHoliday
  }

  type ResourceCalendar {
    resource: Resource!
    calendarDay: Calendar!
    capacity: Int!
  }

  input GetCalendarInput {
    dateFrom: String!
    dateTo: String!
  }

  input GetResourceCaledarInput {
    resourceId: String!
    dateFrom: String!
    dateTo: String!
  }

  type Query {
    calendar(args: GetCalendarInput): [Calendar!]! @requireAuth
    resourceCalendar(args: GetResourceCaledarInput): [ResourceCalendar!]! @requireAuth
  }
`;
