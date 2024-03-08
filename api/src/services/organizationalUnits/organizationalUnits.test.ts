import type { OrganizationalUnit } from "@prisma/client";

import {
  organizationalUnits,
  organizationalUnit,
  createOrganizationalUnit,
  updateOrganizationalUnit,
  deleteOrganizationalUnit,
} from "./organizationalUnits";
import type { StandardScenario } from "./organizationalUnits.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("organizationalUnits", () => {
  scenario(
    "returns all organizationalUnits",
    async (scenario: StandardScenario) => {
      const result = await organizationalUnits();

      expect(result.length).toEqual(
        Object.keys(scenario.organizationalUnit).length
      );
    }
  );

  scenario(
    "returns a single organizationalUnit",
    async (scenario: StandardScenario) => {
      const result = await organizationalUnit({
        id: scenario.organizationalUnit.one.id,
      });

      expect(result).toEqual(scenario.organizationalUnit.one);
    }
  );

  scenario("creates a organizationalUnit", async () => {
    const result = await createOrganizationalUnit({
      input: { code: "String4016465", name: "String" },
    });

    expect(result.code).toEqual("String4016465");
    expect(result.name).toEqual("String");
  });

  scenario(
    "updates a organizationalUnit",
    async (scenario: StandardScenario) => {
      const original = (await organizationalUnit({
        id: scenario.organizationalUnit.one.id,
      })) as OrganizationalUnit;
      const result = await updateOrganizationalUnit({
        id: original.id,
        input: { code: "String39712272" },
      });

      expect(result.code).toEqual("String39712272");
    }
  );

  scenario(
    "deletes a organizationalUnit",
    async (scenario: StandardScenario) => {
      const original = (await deleteOrganizationalUnit({
        id: scenario.organizationalUnit.one.id,
      })) as OrganizationalUnit;
      const result = await organizationalUnit({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
