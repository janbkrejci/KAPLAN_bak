import type { Prisma, ResourceCapability } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ResourceCapabilityCreateArgs>({
  resourceCapability: {
    one: { data: { name: 'String', updatedAt: '2024-02-29T10:22:39.719Z' } },
    two: { data: { name: 'String', updatedAt: '2024-02-29T10:22:39.719Z' } },
  },
})

export type StandardScenario = ScenarioData<
  ResourceCapability,
  'resourceCapability'
>
