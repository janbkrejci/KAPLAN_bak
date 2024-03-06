import type {
  QueryResolvers,
  MutationResolvers,
  ResourceLeaveRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const resourceLeaves: QueryResolvers['resourceLeaves'] = () => {
  return db.resourceLeave.findMany()
}

export const resourceLeave: QueryResolvers['resourceLeave'] = ({ id }) => {
  return db.resourceLeave.findUnique({
    where: { id },
  })
}

export const createResourceLeave: MutationResolvers['createResourceLeave'] = ({
  input,
}) => {
  return db.resourceLeave.create({
    data: input,
  })
}

export const updateResourceLeave: MutationResolvers['updateResourceLeave'] = ({
  id,
  input,
}) => {
  return db.resourceLeave.update({
    data: input,
    where: { id },
  })
}

export const deleteResourceLeave: MutationResolvers['deleteResourceLeave'] = ({
  id,
}) => {
  return db.resourceLeave.delete({
    where: { id },
  })
}

export const ResourceLeave: ResourceLeaveRelationResolvers = {
  resourceLeaveType: (_obj, { root }) => {
    return db.resourceLeave
      .findUnique({ where: { id: root?.id } })
      .resourceLeaveType()
  },
  resource: (_obj, { root }) => {
    return db.resourceLeave.findUnique({ where: { id: root?.id } }).resource()
  },
}
