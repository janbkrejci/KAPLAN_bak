import type { WorkingHoursSchema } from '@prisma/client'

import {
  workingHoursSchemata,
  workingHoursSchema,
  createWorkingHoursSchema,
  updateWorkingHoursSchema,
  deleteWorkingHoursSchema,
} from './workingHoursSchemata'
import type { StandardScenario } from './workingHoursSchemata.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('workingHoursSchemata', () => {
  scenario(
    'returns all workingHoursSchemata',
    async (scenario: StandardScenario) => {
      const result = await workingHoursSchemata()

      expect(result.length).toEqual(
        Object.keys(scenario.workingHoursSchema).length
      )
    }
  )

  scenario(
    'returns a single workingHoursSchema',
    async (scenario: StandardScenario) => {
      const result = await workingHoursSchema({
        id: scenario.workingHoursSchema.one.id,
      })

      expect(result).toEqual(scenario.workingHoursSchema.one)
    }
  )

  scenario('creates a workingHoursSchema', async () => {
    const result = await createWorkingHoursSchema({
      input: { name: 'String', updatedAt: '2024-03-05T15:40:37.540Z' },
    })

    expect(result.name).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2024-03-05T15:40:37.540Z'))
  })

  scenario(
    'updates a workingHoursSchema',
    async (scenario: StandardScenario) => {
      const original = (await workingHoursSchema({
        id: scenario.workingHoursSchema.one.id,
      })) as WorkingHoursSchema
      const result = await updateWorkingHoursSchema({
        id: original.id,
        input: { name: 'String2' },
      })

      expect(result.name).toEqual('String2')
    }
  )

  scenario(
    'deletes a workingHoursSchema',
    async (scenario: StandardScenario) => {
      const original = (await deleteWorkingHoursSchema({
        id: scenario.workingHoursSchema.one.id,
      })) as WorkingHoursSchema
      const result = await workingHoursSchema({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
