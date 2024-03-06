import type {
  QueryResolvers,
  MutationResolvers,
  WorkingHoursSchemaRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const workingHoursSchemata: QueryResolvers['workingHoursSchemata'] =
  () => {
    return db.workingHoursSchema.findMany()
  }

export const workingHoursSchema: QueryResolvers['workingHoursSchema'] = ({
  id,
}) => {
  return db.workingHoursSchema.findUnique({
    where: { id },
  })
}

export const createWorkingHoursSchema: MutationResolvers['createWorkingHoursSchema'] =
  ({ input }) => {
    return db.workingHoursSchema.create({
      data: input,
    })
  }

export const updateWorkingHoursSchema: MutationResolvers['updateWorkingHoursSchema'] =
  ({ id, input }) => {
    return db.workingHoursSchema.update({
      data: input,
      where: { id },
    })
  }

export const deleteWorkingHoursSchema: MutationResolvers['deleteWorkingHoursSchema'] =
  ({ id }) => {
    return db.workingHoursSchema.delete({
      where: { id },
    })
  }

export const WorkingHoursSchema: WorkingHoursSchemaRelationResolvers = {
  resources: (_obj, { root }) => {
    return db.workingHoursSchema
      .findUnique({ where: { id: root?.id } })
      .resources()
  },
}
