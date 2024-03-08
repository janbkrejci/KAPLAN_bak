import type {
  QueryResolvers,
  MutationResolvers,
  OrganizationalUnitRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const organizationalUnits: QueryResolvers["organizationalUnits"] =
  () => {
    return db.organizationalUnit.findMany();
  };

export const organizationalUnit: QueryResolvers["organizationalUnit"] = ({
  id,
}) => {
  return db.organizationalUnit.findUnique({
    where: { id },
  });
};

export const createOrganizationalUnit: MutationResolvers["createOrganizationalUnit"] =
  ({ input }) => {
    return db.organizationalUnit.create({
      data: input,
    });
  };

export const updateOrganizationalUnit: MutationResolvers["updateOrganizationalUnit"] =
  ({ id, input }) => {
    return db.organizationalUnit.update({
      data: input,
      where: { id },
    });
  };

export const deleteOrganizationalUnit: MutationResolvers["deleteOrganizationalUnit"] =
  ({ id }) => {
    return db.organizationalUnit.delete({
      where: { id },
    });
  };

export const OrganizationalUnit: OrganizationalUnitRelationResolvers = {
  parentOrganizationalUnit: (_obj, { root }) => {
    return db.organizationalUnit
      .findUnique({ where: { id: root?.id } })
      .parentOrganizationalUnit();
  },
  childOrganizationalUnits: (_obj, { root }) => {
    return db.organizationalUnit
      .findUnique({ where: { id: root?.id } })
      .childOrganizationalUnits();
  },
  resources: (_obj, { root }) => {
    return db.organizationalUnit
      .findUnique({ where: { id: root?.id } })
      .resources();
  },
};
