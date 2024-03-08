import type {
  QueryResolvers,
  MutationResolvers,
  ResourceLeaveTypeRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const resourceLeaveTypes: QueryResolvers["resourceLeaveTypes"] = () => {
  return db.resourceLeaveType.findMany();
};

export const resourceLeaveType: QueryResolvers["resourceLeaveType"] = ({
  id,
}) => {
  return db.resourceLeaveType.findUnique({
    where: { id },
  });
};

export const createResourceLeaveType: MutationResolvers["createResourceLeaveType"] =
  ({ input }) => {
    return db.resourceLeaveType.create({
      data: input,
    });
  };

export const updateResourceLeaveType: MutationResolvers["updateResourceLeaveType"] =
  ({ id, input }) => {
    return db.resourceLeaveType.update({
      data: input,
      where: { id },
    });
  };

export const deleteResourceLeaveType: MutationResolvers["deleteResourceLeaveType"] =
  ({ id }) => {
    return db.resourceLeaveType.delete({
      where: { id },
    });
  };

export const ResourceLeaveType: ResourceLeaveTypeRelationResolvers = {
  resourceLeaves: (_obj, { root }) => {
    return db.resourceLeaveType
      .findUnique({ where: { id: root?.id } })
      .resourceLeaves();
  },
  validForResourceKinds: (_obj, { root }) => {
    return db.resourceLeaveType
      .findUnique({ where: { id: root?.id } })
      .validForResourceKinds();
  },
};
