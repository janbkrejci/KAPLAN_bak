import type {
  QueryResolvers,
  MutationResolvers,
  ResourceKindRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const resourceKinds: QueryResolvers["resourceKinds"] = () => {
  return db.resourceKind.findMany();
};

export const resourceKind: QueryResolvers["resourceKind"] = ({ id }) => {
  return db.resourceKind.findUnique({
    where: { id },
  });
};

export const createResourceKind: MutationResolvers["createResourceKind"] = ({
  input,
}) => {
  return db.resourceKind.create({
    data: input,
  });
};

export const updateResourceKind: MutationResolvers["updateResourceKind"] = ({
  id,
  input,
}) => {
  return db.resourceKind.update({
    data: input,
    where: { id },
  });
};

export const deleteResourceKind: MutationResolvers["deleteResourceKind"] = ({
  id,
}) => {
  return db.resourceKind.delete({
    where: { id },
  });
};

export const ResourceKind: ResourceKindRelationResolvers = {
  Resources: (_obj, { root }) => {
    return db.resourceKind.findUnique({ where: { id: root?.id } }).Resources();
  },
  workingHoursSchema: (_obj, { root }) => {
    return db.resourceKind
      .findUnique({ where: { id: root?.id } })
      .workingHoursSchema();
  },
};
