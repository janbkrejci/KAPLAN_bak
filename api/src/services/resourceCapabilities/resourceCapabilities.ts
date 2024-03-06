import type {
  QueryResolvers,
  MutationResolvers,
  ResourceCapabilityRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const resourceCapabilities: QueryResolvers['resourceCapabilities'] =
  () => {
    return db.resourceCapability.findMany()
  }

export const resourceCapability: QueryResolvers['resourceCapability'] = ({
  id,
}) => {
  return db.resourceCapability.findUnique({
    where: { id },
  })
}

export const createResourceCapability: MutationResolvers['createResourceCapability'] =
  ({ input }) => {
    return db.resourceCapability.create({
      data: input,
    })
  }

export const updateResourceCapability: MutationResolvers['updateResourceCapability'] =
  ({ id, input }) => {
    return db.resourceCapability.update({
      data: input,
      where: { id },
    })
  }

export const deleteResourceCapability: MutationResolvers['deleteResourceCapability'] =
  ({ id }) => {
    return db.resourceCapability.delete({
      where: { id },
    })
  }

export const ResourceCapability: ResourceCapabilityRelationResolvers = {
  resources: (_obj, { root }) => {
    return db.resourceCapability
      .findUnique({ where: { id: root?.id } })
      .resources()
  },
}
