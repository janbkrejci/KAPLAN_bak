import type { Prisma, WorkingHoursSchema } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.WorkingHoursSchemaCreateArgs>({
  workingHoursSchema: {
    one: { data: { name: "String" } },
    two: { data: { name: "String" } },
  },
});

export type StandardScenario = ScenarioData<
  WorkingHoursSchema,
  "workingHoursSchema"
>;
