import type {
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

// funkce calendar vrací pole objektů typu Calendar podle definice v customCalendar.sdl.ts
export const calendar: QueryResolvers['calendar'] = async ({ args }) => {
  const dateFrom = new Date(args.dateFrom)
  const dateTo = new Date(args.dateTo)
  // vytvoření pole s daty pro každý den v rozsahu od args.dateFrom do args.dateTo
  const dates = []
  for (let date = dateFrom; date <= dateTo; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date))
  }
  // načtení NationalHolidays z databáze a doplnění aktuálního roku tam, kde je null, pak přeložení na pole typu Date
  const nationalHolidays = (await db.nationalHoliday.findMany({})).map(holiday => {
    return {
      day: holiday.day,
      month: holiday.month,
      year: holiday.year,
      name: holiday.name
    }
  })
  // vytvoření pole objektů typu Calendar
  const calendar = dates.map(date => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const holiday = nationalHolidays.find(holiday => holiday.day === day && holiday.month === month && (!holiday.year || holiday.year === year))
    const isHoliday = !!holiday
    const isWeekend = date.getDay() === 0 || date.getDay() === 6

    enum DayOfWeek {
      SUNDAY,
      MONDAY,
      TUESDAY,
      WEDNESDAY,
      THURSDAY,
      FRIDAY,
      SATURDAY
    }

    enum DayType {
      WORKING_DAY,
      WEEKEND,
      HOLIDAY_WORKING_DAY,
      HOLIDAY_WEEKEND
    }

    const dayType = DayType[(isHoliday ? (isWeekend ? DayType.HOLIDAY_WEEKEND : DayType.HOLIDAY_WORKING_DAY) : isWeekend ? DayType.WEEKEND : DayType.WORKING_DAY)]

    return {
      day: day,
      month: month,
      year: year,
      dayOfWeek: DayOfWeek[date.getDay()],
      dayType: dayType,
      holiday: holiday
    }
  })
  return calendar
}

export const resourceCalendar: QueryResolvers['resourceCalendar'] = async ({ args }) => {
  const myCalendar = await calendar({ args: { dateFrom: args.dateFrom, dateTo: args.dateTo } });
  // get resource including its resourcekind and its workingHoursSchema
  const resource = await db.resource.findUnique({
    where: {
      id: args.resourceId
    },
    include: {
      resourceKind: {
        include: {
          workingHoursSchema: true
        }
      }
    }
  })
  // get resource allocations, TODO, not yet implemented
  // get resource disponible hours according to workingHoursSchema and current dayType and dayOfWeek
  const whs = resource.resourceKind.workingHoursSchema

  const resourceCalendar = myCalendar.map(date => {
    const dayType = date.dayType
    const dayOfWeek = date.dayOfWeek
    let dailyCapacity = 0
    switch (dayType) {
      case 'WORKING_DAY':
        switch (dayOfWeek) {
          case 'MONDAY':
            dailyCapacity = whs.monday
            break
          case 'TUESDAY':
            dailyCapacity = whs.tuesday
            break
          case 'WEDNESDAY':
            dailyCapacity = whs.wednesday
            break
          case 'THURSDAY':
            dailyCapacity = whs.thursday
            break
          case 'FRIDAY':
            dailyCapacity = whs.friday
            break
        }
        break
      case 'WEEKEND':
        switch (dayOfWeek) {
          case 'SATURDAY':
            dailyCapacity = whs.saturday
            break
          case 'SUNDAY':
            dailyCapacity = whs.sunday
            break
        }
        break
      case 'HOLIDAY':
        dailyCapacity = whs.holidayIfWorkDay
        break
      case 'HOLIDAY_WEEKEND':
        dailyCapacity = whs.holidayIfWeekend
        break
    }
    return {
      resource: resource,
      calendarDay: date,
      capacity: dailyCapacity,
    }
  })
  return resourceCalendar
}
