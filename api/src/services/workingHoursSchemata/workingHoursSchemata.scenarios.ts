import type { Prisma, WorkingHoursSchema } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WorkingHoursSchemaCreateArgs>({
  workingHoursSchema: {
    one: { data: { name: 'String', updatedAt: '2024-03-05T15:40:37.554Z' } },
    two: { data: { name: 'String', updatedAt: '2024-03-05T15:40:37.554Z' } },
  },
})

export type StandardScenario = ScenarioData<
  WorkingHoursSchema,
  'workingHoursSchema'
>
