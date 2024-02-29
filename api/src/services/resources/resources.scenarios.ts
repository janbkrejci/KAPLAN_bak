import type { Prisma, Resource } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ResourceCreateArgs>({
  resource: {
    one: {
      data: {
        name: 'String',
        updatedAt: '2024-02-29T10:16:30.496Z',
        kind: {
          create: {
            name: 'String',
            hourlyCost: 4993009.7054629205,
            updatedAt: '2024-02-29T10:16:30.496Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        updatedAt: '2024-02-29T10:16:30.496Z',
        kind: {
          create: {
            name: 'String',
            hourlyCost: 6596379.203900291,
            updatedAt: '2024-02-29T10:16:30.496Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Resource, 'resource'>
