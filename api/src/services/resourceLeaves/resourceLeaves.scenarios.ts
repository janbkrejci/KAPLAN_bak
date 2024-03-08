import type { Prisma, ResourceLeave } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ResourceLeaveCreateArgs>({
  resourceLeave: {
    one: {
      data: {
        description: "String",
        from: "2024-03-07T16:34:28.502Z",
        to: "2024-03-07T16:34:28.502Z",
        firstDayWorkingHours: 1715095.7273115285,
        lastDayWorkingHours: 6097861.721969608,
        resource: {
          create: {
            name: "String",
            activeSince: "2024-03-07T16:34:28.502Z",
            updatedAt: "2024-03-07T16:34:28.502Z",
            resourceKind: {
              create: {
                name: "String4313316",
                hourlyCost: 5248871.886297677,
                workingHoursSchema: { create: { name: "String" } },
              },
            },
            organizationalUnit: {
              create: { code: "String5231101", name: "String" },
            },
          },
        },
      },
    },
    two: {
      data: {
        description: "String",
        from: "2024-03-07T16:34:28.502Z",
        to: "2024-03-07T16:34:28.502Z",
        firstDayWorkingHours: 2583584.2412851863,
        lastDayWorkingHours: 3897983.680526984,
        resource: {
          create: {
            name: "String",
            activeSince: "2024-03-07T16:34:28.502Z",
            updatedAt: "2024-03-07T16:34:28.502Z",
            resourceKind: {
              create: {
                name: "String2380905",
                hourlyCost: 1773799.6528381417,
                workingHoursSchema: { create: { name: "String" } },
              },
            },
            organizationalUnit: {
              create: { code: "String5211206", name: "String" },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<ResourceLeave, "resourceLeave">;
