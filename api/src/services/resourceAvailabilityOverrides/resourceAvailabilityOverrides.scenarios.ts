import type { Prisma, ResourceAvailabilityOverride } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.ResourceAvailabilityOverrideCreateArgs>({
    resourceAvailabilityOverride: {
      one: {
        data: { description: 'String', dailyHoursAvailable: 2934059.600831214 },
      },
      two: {
        data: { description: 'String', dailyHoursAvailable: 4600086.81165265 },
      },
    },
  })

export type StandardScenario = ScenarioData<
  ResourceAvailabilityOverride,
  'resourceAvailabilityOverride'
>
