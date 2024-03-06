import type {
  QueryResolvers,


} from 'types/graphql'

import { db } from 'src/lib/db'

export const parentOrganizationalUnits: QueryResolvers['parentOrganizationalUnits'] = () => {
  return db.organizationalUnit.findMany({
    where: { parentOrganizationalUnitId: null },
  })
}
