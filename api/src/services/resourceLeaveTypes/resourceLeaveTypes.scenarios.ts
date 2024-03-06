import type { Prisma, ResourceLeaveType } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ResourceLeaveTypeCreateArgs>({
  resourceLeaveType: {
    one: {
      data: { name: 'String4614667', updatedAt: '2024-03-05T15:40:42.340Z' },
    },
    two: {
      data: { name: 'String9961519', updatedAt: '2024-03-05T15:40:42.340Z' },
    },
  },
})

export type StandardScenario = ScenarioData<
  ResourceLeaveType,
  'resourceLeaveType'
>
