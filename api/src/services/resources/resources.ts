import type {
  QueryResolvers,
  MutationResolvers,
  ResourceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const resources: QueryResolvers['resources'] = () => {
  return db.resource.findMany()
}

export const resource: QueryResolvers['resource'] = ({ id }) => {
  return db.resource.findUnique({
    where: { id },
  })
}

export const createResource: MutationResolvers['createResource'] = ({
  input,
}) => {
  return db.resource.create({
    data: input,
  })
}

export const updateResource: MutationResolvers['updateResource'] = ({
  id,
  input,
}) => {
  return db.resource.update({
    data: input,
    where: { id },
  })
}

export const deleteResource: MutationResolvers['deleteResource'] = ({ id }) => {
  return db.resource.delete({
    where: { id },
  })
}

export const Resource: ResourceRelationResolvers = {
  manager: (_obj, { root }) => {
    return db.resource.findUnique({ where: { id: root?.id } }).manager()
  },
  subordinates: (_obj, { root }) => {
    return db.resource.findUnique({ where: { id: root?.id } }).subordinates()
  },
  resourceCapabilities: (_obj, { root }) => {
    return db.resource
      .findUnique({ where: { id: root?.id } })
      .resourceCapabilities()
  },
  resourceKind: (_obj, { root }) => {
    return db.resource.findUnique({ where: { id: root?.id } }).resourceKind()
  },
  workingHoursSchema: (_obj, { root }) => {
    return db.resource
      .findUnique({ where: { id: root?.id } })
      .workingHoursSchema()
  },
  resourceLeaves: (_obj, { root }) => {
    return db.resource.findUnique({ where: { id: root?.id } }).resourceLeaves()
  },
  resourceAvailabilityOverrides: (_obj, { root }) => {
    return db.resource
      .findUnique({ where: { id: root?.id } })
      .resourceAvailabilityOverrides()
  },
  organizationalUnit: (_obj, { root }) => {
    return db.resource
      .findUnique({ where: { id: root?.id } })
      .organizationalUnit()
  },
}
