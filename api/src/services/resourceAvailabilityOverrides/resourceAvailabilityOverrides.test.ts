import type { ResourceAvailabilityOverride } from "@prisma/client";

import {
  resourceAvailabilityOverrides,
  resourceAvailabilityOverride,
  createResourceAvailabilityOverride,
  updateResourceAvailabilityOverride,
  deleteResourceAvailabilityOverride,
} from "./resourceAvailabilityOverrides";
import type { StandardScenario } from "./resourceAvailabilityOverrides.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("resourceAvailabilityOverrides", () => {
  scenario(
    "returns all resourceAvailabilityOverrides",
    async (scenario: StandardScenario) => {
      const result = await resourceAvailabilityOverrides();

      expect(result.length).toEqual(
        Object.keys(scenario.resourceAvailabilityOverride).length
      );
    }
  );

  scenario(
    "returns a single resourceAvailabilityOverride",
    async (scenario: StandardScenario) => {
      const result = await resourceAvailabilityOverride({
        id: scenario.resourceAvailabilityOverride.one.id,
      });

      expect(result).toEqual(scenario.resourceAvailabilityOverride.one);
    }
  );

  scenario("creates a resourceAvailabilityOverride", async () => {
    const result = await createResourceAvailabilityOverride({
      input: { description: "String", dailyHoursAvailable: 5538727.4578067465 },
    });

    expect(result.description).toEqual("String");
    expect(result.dailyHoursAvailable).toEqual(5538727.4578067465);
  });

  scenario(
    "updates a resourceAvailabilityOverride",
    async (scenario: StandardScenario) => {
      const original = (await resourceAvailabilityOverride({
        id: scenario.resourceAvailabilityOverride.one.id,
      })) as ResourceAvailabilityOverride;
      const result = await updateResourceAvailabilityOverride({
        id: original.id,
        input: { description: "String2" },
      });

      expect(result.description).toEqual("String2");
    }
  );

  scenario(
    "deletes a resourceAvailabilityOverride",
    async (scenario: StandardScenario) => {
      const original = (await deleteResourceAvailabilityOverride({
        id: scenario.resourceAvailabilityOverride.one.id,
      })) as ResourceAvailabilityOverride;
      const result = await resourceAvailabilityOverride({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
