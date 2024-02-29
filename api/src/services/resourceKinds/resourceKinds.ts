import type {
  QueryResolvers,
  MutationResolvers,
  ResourceKindRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { LiveQueryStorageMechanism } from '@redwoodjs/realtime'

export const resourceKinds: QueryResolvers['resourceKinds'] = () => {
  return db.resourceKind.findMany()
}

export const resourceKind: QueryResolvers['resourceKind'] = ({ id }) => {
  return db.resourceKind.findUnique({
    where: { id },
  })
}

export const createResourceKind: MutationResolvers['createResourceKind'] = async ({
  input,
},
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
) => {
  const result = await db.resourceKind.create({
    data: input,
  })
  context.liveQueryStore.invalidate('Query.resourceKinds')
  return result
}

export const updateResourceKind: MutationResolvers['updateResourceKind'] = async ({
  id,
  input,
},
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
) => {
  const result = await db.resourceKind.update({
    data: input,
    where: { id },
  })
  const key = `ResourceKind:${id}`
  context.liveQueryStore.invalidate(key)
  return result
}

export const deleteResourceKind: MutationResolvers['deleteResourceKind'] = async ({
  id,
},
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
) => {
  const result = await db.resourceKind.delete({
    where: { id },
  })
  const key = `ResourceKind:${id}`
  context.liveQueryStore.invalidate(key)
  return result
}

export const ResourceKind: ResourceKindRelationResolvers = {
  Resources: (_obj, { root }) => {
    return db.resourceKind.findUnique({ where: { id: root?.id } }).Resources()
  },
}
