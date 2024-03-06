import type { Prisma, ResourceKind } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ResourceKindCreateArgs>({
  resourceKind: {
    one: {
      data: {
        name: 'String1020039',
        hourlyCost: 1838949.8949446103,
        updatedAt: '2024-03-05T15:40:32.776Z',
      },
    },
    two: {
      data: {
        name: 'String6152833',
        hourlyCost: 3588078.559666783,
        updatedAt: '2024-03-05T15:40:32.776Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<ResourceKind, 'resourceKind'>
