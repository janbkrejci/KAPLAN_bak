import type { Prisma, NationalHoliday } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NationalHolidayCreateArgs>({
  nationalHoliday: {
    one: { data: { name: 'String', day: 2277420, month: 4683181 } },
    two: { data: { name: 'String', day: 6791508, month: 3151613 } },
  },
})

export type StandardScenario = ScenarioData<NationalHoliday, 'nationalHoliday'>
