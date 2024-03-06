import type { Prisma, OrganizationalUnit } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationalUnitCreateArgs>({
  organizationalUnit: {
    one: { data: { code: 'String9106700', name: 'String' } },
    two: { data: { code: 'String5481657', name: 'String' } },
  },
})

export type StandardScenario = ScenarioData<
  OrganizationalUnit,
  'organizationalUnit'
>
