import type {
  QueryResolvers,
  MutationResolvers,
  ResourceCapabilityRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { LiveQueryStorageMechanism } from '@redwoodjs/realtime'

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
  async ({ input },
    { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
  ) => {
    const result = await db.resourceCapability.create({
      data: input,
    })
    context.liveQueryStore.invalidate('Query.resourceCapabilities')
    return result
  }

export const updateResourceCapability: MutationResolvers['updateResourceCapability'] =
  async ({ id, input },
    { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
  ) => {
    const result = await db.resourceCapability.update({
      data: input,
      where: { id },
    })
    const key = `ResourceCapability:${id}`
    context.liveQueryStore.invalidate(key)
    return result
  }

export const deleteResourceCapability: MutationResolvers['deleteResourceCapability'] =
  async ({ id },
    { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
  ) => {
    const result = await db.resourceCapability.delete({
      where: { id },
    })
    const key = `ResourceCapability:${id}`
    context.liveQueryStore.invalidate(key)
    return result
  }

export const ResourceCapability: ResourceCapabilityRelationResolvers = {
  resources: (_obj, { root }) => {
    return db.resourceCapability
      .findUnique({ where: { id: root?.id } })
      .resources()
  },
}
