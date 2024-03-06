import type {
  QueryResolvers,
  MutationResolvers,
  ResourceLeaveApprovalStateRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const resourceLeaveApprovalStates: QueryResolvers['resourceLeaveApprovalStates'] =
  () => {
    return db.resourceLeaveApprovalState.findMany()
  }

export const resourceLeaveApprovalState: QueryResolvers['resourceLeaveApprovalState'] =
  ({ id }) => {
    return db.resourceLeaveApprovalState.findUnique({
      where: { id },
    })
  }

export const createResourceLeaveApprovalState: MutationResolvers['createResourceLeaveApprovalState'] =
  ({ input }) => {
    return db.resourceLeaveApprovalState.create({
      data: input,
    })
  }

export const updateResourceLeaveApprovalState: MutationResolvers['updateResourceLeaveApprovalState'] =
  ({ id, input }) => {
    return db.resourceLeaveApprovalState.update({
      data: input,
      where: { id },
    })
  }

export const deleteResourceLeaveApprovalState: MutationResolvers['deleteResourceLeaveApprovalState'] =
  ({ id }) => {
    return db.resourceLeaveApprovalState.delete({
      where: { id },
    })
  }

export const ResourceLeaveApprovalState: ResourceLeaveApprovalStateRelationResolvers =
  {
    resourceLeaves: (_obj, { root }) => {
      return db.resourceLeaveApprovalState
        .findUnique({ where: { id: root?.id } })
        .resourceLeaves()
    },
  }
