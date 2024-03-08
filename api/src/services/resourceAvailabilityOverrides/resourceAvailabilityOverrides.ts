import type {
  QueryResolvers,
  MutationResolvers,
  ResourceAvailabilityOverrideRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const resourceAvailabilityOverrides: QueryResolvers["resourceAvailabilityOverrides"] =
  () => {
    return db.resourceAvailabilityOverride.findMany();
  };

export const resourceAvailabilityOverride: QueryResolvers["resourceAvailabilityOverride"] =
  ({ id }) => {
    return db.resourceAvailabilityOverride.findUnique({
      where: { id },
    });
  };

export const createResourceAvailabilityOverride: MutationResolvers["createResourceAvailabilityOverride"] =
  ({ input }) => {
    return db.resourceAvailabilityOverride.create({
      data: input,
    });
  };

export const updateResourceAvailabilityOverride: MutationResolvers["updateResourceAvailabilityOverride"] =
  ({ id, input }) => {
    return db.resourceAvailabilityOverride.update({
      data: input,
      where: { id },
    });
  };

export const deleteResourceAvailabilityOverride: MutationResolvers["deleteResourceAvailabilityOverride"] =
  ({ id }) => {
    return db.resourceAvailabilityOverride.delete({
      where: { id },
    });
  };

export const ResourceAvailabilityOverride: ResourceAvailabilityOverrideRelationResolvers =
  {
    resources: (_obj, { root }) => {
      return db.resourceAvailabilityOverride
        .findUnique({ where: { id: root?.id } })
        .resources();
    },
  };
