import type { Prisma, ResourceCapability } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ResourceCapabilityCreateArgs>({
  resourceCapability: {
    one: { data: { name: "String5421668" } },
    two: { data: { name: "String7808020" } },
  },
});

export type StandardScenario = ScenarioData<
  ResourceCapability,
  "resourceCapability"
>;
