import type { Prisma, ResourceKind } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ResourceKindCreateArgs>({
  resourceKind: {
    one: {
      data: {
        name: 'String',
        hourlyCost: 5872127.771426887,
        updatedAt: '2024-02-29T10:17:12.274Z',
      },
    },
    two: {
      data: {
        name: 'String',
        hourlyCost: 6605952.474657279,
        updatedAt: '2024-02-29T10:17:12.274Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<ResourceKind, 'resourceKind'>
