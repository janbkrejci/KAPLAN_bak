import type { Prisma, Resource } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ResourceCreateArgs>({
  resource: {
    one: {
      data: {
        name: 'String',
        activeSince: '2024-03-05T15:40:30.170Z',
        updatedAt: '2024-03-05T15:40:30.170Z',
        resourceKind: {
          create: {
            name: 'String8667330',
            hourlyCost: 7251808.138794977,
            updatedAt: '2024-03-05T15:40:30.170Z',
          },
        },
        workingHoursSchema: {
          create: { name: 'String', updatedAt: '2024-03-05T15:40:30.170Z' },
        },
        organizationalUnit: {
          create: { code: 'String1510246', name: 'String' },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        activeSince: '2024-03-05T15:40:30.170Z',
        updatedAt: '2024-03-05T15:40:30.170Z',
        resourceKind: {
          create: {
            name: 'String4440240',
            hourlyCost: 6313362.408927341,
            updatedAt: '2024-03-05T15:40:30.170Z',
          },
        },
        workingHoursSchema: {
          create: { name: 'String', updatedAt: '2024-03-05T15:40:30.170Z' },
        },
        organizationalUnit: {
          create: { code: 'String7458815', name: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Resource, 'resource'>
