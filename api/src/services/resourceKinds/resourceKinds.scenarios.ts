import type { Prisma, ResourceKind } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ResourceKindCreateArgs>({
  resourceKind: {
    one: {
      data: {
        name: "String7660293",
        hourlyCost: 242979.6298305864,
        workingHoursSchema: { create: { name: "String" } },
      },
    },
    two: {
      data: {
        name: "String3280797",
        hourlyCost: 8429967.940704312,
        workingHoursSchema: { create: { name: "String" } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<ResourceKind, "resourceKind">;
