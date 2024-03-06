import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const nationalHolidays: QueryResolvers['nationalHolidays'] = () => {
  return db.nationalHoliday.findMany()
}

export const nationalHoliday: QueryResolvers['nationalHoliday'] = ({ id }) => {
  return db.nationalHoliday.findUnique({
    where: { id },
  })
}

export const createNationalHoliday: MutationResolvers['createNationalHoliday'] =
  ({ input }) => {
    return db.nationalHoliday.create({
      data: input,
    })
  }

export const updateNationalHoliday: MutationResolvers['updateNationalHoliday'] =
  ({ id, input }) => {
    return db.nationalHoliday.update({
      data: input,
      where: { id },
    })
  }

export const deleteNationalHoliday: MutationResolvers['deleteNationalHoliday'] =
  ({ id }) => {
    return db.nationalHoliday.delete({
      where: { id },
    })
  }
