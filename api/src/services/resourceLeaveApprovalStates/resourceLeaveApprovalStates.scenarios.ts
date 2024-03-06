import type { Prisma, ResourceLeaveApprovalState } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.ResourceLeaveApprovalStateCreateArgs>({
    resourceLeaveApprovalState: {
      one: {
        data: {
          order: 1821137,
          name: 'String3561800',
          updatedAt: '2024-03-05T07:39:16.518Z',
        },
      },
      two: {
        data: {
          order: 9789505,
          name: 'String784584',
          updatedAt: '2024-03-05T07:39:16.518Z',
        },
      },
    },
  })

export type StandardScenario = ScenarioData<
  ResourceLeaveApprovalState,
  'resourceLeaveApprovalState'
>
