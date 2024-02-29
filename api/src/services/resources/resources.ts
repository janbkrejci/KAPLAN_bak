import type {
  QueryResolvers,
  MutationResolvers,
  ResourceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { LiveQueryStorageMechanism } from '@redwoodjs/realtime'

export const resources: QueryResolvers['resources'] = () => {
  return db.resource.findMany()
}

export const resource: QueryResolvers['resource'] = ({ id }) => {
  return db.resource.findUnique({
    where: { id },
  })
}

export const createResource: MutationResolvers['createResource'] = async ({
  input,
},
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
) => {
  const result = await db.resource.create({
    data: input,
  })
  context.liveQueryStore.invalidate('Query.resources')
  return result
}

export const updateResource: MutationResolvers['updateResource'] = async ({
  id,
  input,
},
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }) => {
  const result = await db.resource.update({
    data: input,
    where: { id },
  })
  const key = `Resource:${id}`
  context.liveQueryStore.invalidate(key)
  return result
}

export const deleteResource: MutationResolvers['deleteResource'] = async (
  { id },
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }) => {
  const result = await db.resource.delete({
    where: { id },
  })
  const key = `Resource:${id}`
  context.liveQueryStore.invalidate(key)
  return result
}

export const Resource: ResourceRelationResolvers = {
  parent: (_obj, { root }) => {
    return db.resource.findUnique({ where: { id: root?.id } }).parent()
  },
  children: (_obj, { root }) => {
    return db.resource.findUnique({ where: { id: root?.id } }).children()
  },
  capabilities: (_obj, { root }) => {
    return db.resource.findUnique({ where: { id: root?.id } }).capabilities()
  },
  kind: (_obj, { root }) => {
    return db.resource.findUnique({ where: { id: root?.id } }).kind()
  },
}
