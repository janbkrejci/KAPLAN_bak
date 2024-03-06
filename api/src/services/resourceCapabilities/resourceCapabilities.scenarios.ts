import type { Prisma, ResourceCapability } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ResourceCapabilityCreateArgs>({
  resourceCapability: {
    one: {
      data: { name: 'String794953', updatedAt: '2024-03-05T15:40:35.099Z' },
    },
    two: {
      data: { name: 'String4110940', updatedAt: '2024-03-05T15:40:35.100Z' },
    },
  },
})

export type StandardScenario = ScenarioData<
  ResourceCapability,
  'resourceCapability'
>
