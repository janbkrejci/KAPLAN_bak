import type { ResourceLeave } from "@prisma/client";

import {
  resourceLeaves,
  resourceLeave,
  createResourceLeave,
  updateResourceLeave,
  deleteResourceLeave,
} from "./resourceLeaves";
import type { StandardScenario } from "./resourceLeaves.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("resourceLeaves", () => {
  scenario("returns all resourceLeaves", async (scenario: StandardScenario) => {
    const result = await resourceLeaves();

    expect(result.length).toEqual(Object.keys(scenario.resourceLeave).length);
  });

  scenario(
    "returns a single resourceLeave",
    async (scenario: StandardScenario) => {
      const result = await resourceLeave({ id: scenario.resourceLeave.one.id });

      expect(result).toEqual(scenario.resourceLeave.one);
    }
  );

  scenario("creates a resourceLeave", async (scenario: StandardScenario) => {
    const result = await createResourceLeave({
      input: {
        description: "String",
        from: "2024-03-07T16:34:28.428Z",
        to: "2024-03-07T16:34:28.428Z",
        firstDayWorkingHours: 4216774.761863638,
        lastDayWorkingHours: 4668757.207925322,
        resourceId: scenario.resourceLeave.two.resourceId,
      },
    });

    expect(result.description).toEqual("String");
    expect(result.from).toEqual(new Date("2024-03-07T16:34:28.428Z"));
    expect(result.to).toEqual(new Date("2024-03-07T16:34:28.428Z"));
    expect(result.firstDayWorkingHours).toEqual(4216774.761863638);
    expect(result.lastDayWorkingHours).toEqual(4668757.207925322);
    expect(result.resourceId).toEqual(scenario.resourceLeave.two.resourceId);
  });

  scenario("updates a resourceLeave", async (scenario: StandardScenario) => {
    const original = (await resourceLeave({
      id: scenario.resourceLeave.one.id,
    })) as ResourceLeave;
    const result = await updateResourceLeave({
      id: original.id,
      input: { description: "String2" },
    });

    expect(result.description).toEqual("String2");
  });

  scenario("deletes a resourceLeave", async (scenario: StandardScenario) => {
    const original = (await deleteResourceLeave({
      id: scenario.resourceLeave.one.id,
    })) as ResourceLeave;
    const result = await resourceLeave({ id: original.id });

    expect(result).toEqual(null);
  });
});
