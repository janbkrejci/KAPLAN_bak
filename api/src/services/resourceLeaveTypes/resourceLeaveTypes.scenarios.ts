import type { Prisma, ResourceLeaveType } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ResourceLeaveTypeCreateArgs>({
  resourceLeaveType: {
    one: {
      data: { name: "String8582170", updatedAt: "2024-03-07T12:48:48.735Z" },
    },
    two: {
      data: { name: "String7237228", updatedAt: "2024-03-07T12:48:48.735Z" },
    },
  },
});

export type StandardScenario = ScenarioData<
  ResourceLeaveType,
  "resourceLeaveType"
>;
