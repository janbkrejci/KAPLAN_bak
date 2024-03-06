import type { Prisma, ResourceLeave } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ResourceLeaveCreateArgs>({
  resourceLeave: {
    one: {
      data: {
        from: '2024-03-05T15:40:40.028Z',
        to: '2024-03-05T15:40:40.028Z',
        firstDayWorkingHours: 9688858.934652986,
        lastDayWorkingHours: 9685319.891915334,
        resourceLeaveApprovalStateId: 'String',
        updatedAt: '2024-03-05T15:40:40.028Z',
        resourceLeaveType: {
          create: {
            name: 'String3555339',
            updatedAt: '2024-03-05T15:40:40.028Z',
          },
        },
        resource: {
          create: {
            name: 'String',
            activeSince: '2024-03-05T15:40:40.028Z',
            updatedAt: '2024-03-05T15:40:40.028Z',
            resourceKind: {
              create: {
                name: 'String6873113',
                hourlyCost: 7840677.690895725,
                updatedAt: '2024-03-05T15:40:40.028Z',
              },
            },
            workingHoursSchema: {
              create: { name: 'String', updatedAt: '2024-03-05T15:40:40.028Z' },
            },
            organizationalUnit: {
              create: { code: 'String8221740', name: 'String' },
            },
          },
        },
      },
    },
    two: {
      data: {
        from: '2024-03-05T15:40:40.028Z',
        to: '2024-03-05T15:40:40.028Z',
        firstDayWorkingHours: 4455185.601867477,
        lastDayWorkingHours: 9066654.361647503,
        resourceLeaveApprovalStateId: 'String',
        updatedAt: '2024-03-05T15:40:40.028Z',
        resourceLeaveType: {
          create: {
            name: 'String6282378',
            updatedAt: '2024-03-05T15:40:40.028Z',
          },
        },
        resource: {
          create: {
            name: 'String',
            activeSince: '2024-03-05T15:40:40.028Z',
            updatedAt: '2024-03-05T15:40:40.028Z',
            resourceKind: {
              create: {
                name: 'String1144242',
                hourlyCost: 5917357.737822895,
                updatedAt: '2024-03-05T15:40:40.028Z',
              },
            },
            workingHoursSchema: {
              create: { name: 'String', updatedAt: '2024-03-05T15:40:40.028Z' },
            },
            organizationalUnit: {
              create: { code: 'String3185920', name: 'String' },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ResourceLeave, 'resourceLeave'>
