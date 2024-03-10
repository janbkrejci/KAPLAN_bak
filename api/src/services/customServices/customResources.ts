import type {
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const resourcesWithAllocations: QueryResolvers['resourcesWithAllocations'] = async ({ args }) => {
  const resources = (await db.resource.findMany({})).map(resource => {
    return {
      resource: resource,
      dailyCapacities: [
        {
          date: new Date().toLocaleDateString(),
          capacity: 8
        }
      ]
    }
  })
  return {
    from: args.from && new Date(args.from).toLocaleDateString(),
    to: args.to && new Date(args.to).toLocaleDateString(),
    resources: resources
  }

}
