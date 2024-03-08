import type { Prisma, ResourceAvailabilityOverride } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard =
  defineScenario<Prisma.ResourceAvailabilityOverrideCreateArgs>({
    resourceAvailabilityOverride: {
      one: {
        data: { description: "String", dailyHoursAvailable: 5643281.233279314 },
      },
      two: {
        data: {
          description: "String",
          dailyHoursAvailable: 2592342.0488399216,
        },
      },
    },
  });

export type StandardScenario = ScenarioData<
  ResourceAvailabilityOverride,
  "resourceAvailabilityOverride"
>;
