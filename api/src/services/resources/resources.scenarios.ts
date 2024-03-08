import type { Prisma, Resource } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ResourceCreateArgs>({
  resource: {
    one: {
      data: {
        name: "String",
        activeSince: "2024-03-07T16:34:20.610Z",
        updatedAt: "2024-03-07T16:34:20.610Z",
        resourceKind: {
          create: {
            name: "String686845",
            hourlyCost: 976333.8044338776,
            workingHoursSchema: { create: { name: "String" } },
          },
        },
        organizationalUnit: {
          create: { code: "String2721199", name: "String" },
        },
      },
    },
    two: {
      data: {
        name: "String",
        activeSince: "2024-03-07T16:34:20.610Z",
        updatedAt: "2024-03-07T16:34:20.610Z",
        resourceKind: {
          create: {
            name: "String9426529",
            hourlyCost: 878157.6185279593,
            workingHoursSchema: { create: { name: "String" } },
          },
        },
        organizationalUnit: {
          create: { code: "String4476969", name: "String" },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Resource, "resource">;
