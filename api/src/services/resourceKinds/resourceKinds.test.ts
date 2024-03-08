import type { ResourceKind } from "@prisma/client";

import {
  resourceKinds,
  resourceKind,
  createResourceKind,
  updateResourceKind,
  deleteResourceKind,
} from "./resourceKinds";
import type { StandardScenario } from "./resourceKinds.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("resourceKinds", () => {
  scenario("returns all resourceKinds", async (scenario: StandardScenario) => {
    const result = await resourceKinds();

    expect(result.length).toEqual(Object.keys(scenario.resourceKind).length);
  });

  scenario(
    "returns a single resourceKind",
    async (scenario: StandardScenario) => {
      const result = await resourceKind({ id: scenario.resourceKind.one.id });

      expect(result).toEqual(scenario.resourceKind.one);
    }
  );

  scenario("creates a resourceKind", async (scenario: StandardScenario) => {
    const result = await createResourceKind({
      input: {
        name: "String8779340",
        hourlyCost: 7433930.933861195,
        workingHoursSchemaId: scenario.resourceKind.two.workingHoursSchemaId,
      },
    });

    expect(result.name).toEqual("String8779340");
    expect(result.hourlyCost).toEqual(7433930.933861195);
    expect(result.workingHoursSchemaId).toEqual(
      scenario.resourceKind.two.workingHoursSchemaId
    );
  });

  scenario("updates a resourceKind", async (scenario: StandardScenario) => {
    const original = (await resourceKind({
      id: scenario.resourceKind.one.id,
    })) as ResourceKind;
    const result = await updateResourceKind({
      id: original.id,
      input: { name: "String66548422" },
    });

    expect(result.name).toEqual("String66548422");
  });

  scenario("deletes a resourceKind", async (scenario: StandardScenario) => {
    const original = (await deleteResourceKind({
      id: scenario.resourceKind.one.id,
    })) as ResourceKind;
    const result = await resourceKind({ id: original.id });

    expect(result).toEqual(null);
  });
});
