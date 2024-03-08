import type { Resource } from "@prisma/client";

import {
  resources,
  resource,
  createResource,
  updateResource,
  deleteResource,
} from "./resources";
import type { StandardScenario } from "./resources.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("resources", () => {
  scenario("returns all resources", async (scenario: StandardScenario) => {
    const result = await resources();

    expect(result.length).toEqual(Object.keys(scenario.resource).length);
  });

  scenario("returns a single resource", async (scenario: StandardScenario) => {
    const result = await resource({ id: scenario.resource.one.id });

    expect(result).toEqual(scenario.resource.one);
  });

  scenario("creates a resource", async (scenario: StandardScenario) => {
    const result = await createResource({
      input: {
        name: "String",
        resourceKindId: scenario.resource.two.resourceKindId,
        activeSince: "2024-03-07T16:34:20.570Z",
        organizationalUnitId: scenario.resource.two.organizationalUnitId,
        updatedAt: "2024-03-07T16:34:20.570Z",
      },
    });

    expect(result.name).toEqual("String");
    expect(result.resourceKindId).toEqual(scenario.resource.two.resourceKindId);
    expect(result.activeSince).toEqual(new Date("2024-03-07T16:34:20.570Z"));
    expect(result.organizationalUnitId).toEqual(
      scenario.resource.two.organizationalUnitId
    );
    expect(result.updatedAt).toEqual(new Date("2024-03-07T16:34:20.570Z"));
  });

  scenario("updates a resource", async (scenario: StandardScenario) => {
    const original = (await resource({
      id: scenario.resource.one.id,
    })) as Resource;
    const result = await updateResource({
      id: original.id,
      input: { name: "String2" },
    });

    expect(result.name).toEqual("String2");
  });

  scenario("deletes a resource", async (scenario: StandardScenario) => {
    const original = (await deleteResource({
      id: scenario.resource.one.id,
    })) as Resource;
    const result = await resource({ id: original.id });

    expect(result).toEqual(null);
  });
});
