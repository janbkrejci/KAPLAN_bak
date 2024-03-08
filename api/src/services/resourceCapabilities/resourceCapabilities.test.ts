import type { ResourceCapability } from "@prisma/client";

import {
  resourceCapabilities,
  resourceCapability,
  createResourceCapability,
  updateResourceCapability,
  deleteResourceCapability,
} from "./resourceCapabilities";
import type { StandardScenario } from "./resourceCapabilities.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("resourceCapabilities", () => {
  scenario(
    "returns all resourceCapabilities",
    async (scenario: StandardScenario) => {
      const result = await resourceCapabilities();

      expect(result.length).toEqual(
        Object.keys(scenario.resourceCapability).length
      );
    }
  );

  scenario(
    "returns a single resourceCapability",
    async (scenario: StandardScenario) => {
      const result = await resourceCapability({
        id: scenario.resourceCapability.one.id,
      });

      expect(result).toEqual(scenario.resourceCapability.one);
    }
  );

  scenario("creates a resourceCapability", async () => {
    const result = await createResourceCapability({
      input: { name: "String3884579" },
    });

    expect(result.name).toEqual("String3884579");
  });

  scenario(
    "updates a resourceCapability",
    async (scenario: StandardScenario) => {
      const original = (await resourceCapability({
        id: scenario.resourceCapability.one.id,
      })) as ResourceCapability;
      const result = await updateResourceCapability({
        id: original.id,
        input: { name: "String4823402" },
      });

      expect(result.name).toEqual("String4823402");
    }
  );

  scenario(
    "deletes a resourceCapability",
    async (scenario: StandardScenario) => {
      const original = (await deleteResourceCapability({
        id: scenario.resourceCapability.one.id,
      })) as ResourceCapability;
      const result = await resourceCapability({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
