import type { NationalHoliday } from '@prisma/client'

import {
  nationalHolidays,
  nationalHoliday,
  createNationalHoliday,
  updateNationalHoliday,
  deleteNationalHoliday,
} from './nationalHolidays'
import type { StandardScenario } from './nationalHolidays.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('nationalHolidays', () => {
  scenario(
    'returns all nationalHolidays',
    async (scenario: StandardScenario) => {
      const result = await nationalHolidays()

      expect(result.length).toEqual(
        Object.keys(scenario.nationalHoliday).length
      )
    }
  )

  scenario(
    'returns a single nationalHoliday',
    async (scenario: StandardScenario) => {
      const result = await nationalHoliday({
        id: scenario.nationalHoliday.one.id,
      })

      expect(result).toEqual(scenario.nationalHoliday.one)
    }
  )

  scenario('creates a nationalHoliday', async () => {
    const result = await createNationalHoliday({
      input: { name: 'String', day: 5595042, month: 9421966 },
    })

    expect(result.name).toEqual('String')
    expect(result.day).toEqual(5595042)
    expect(result.month).toEqual(9421966)
  })

  scenario('updates a nationalHoliday', async (scenario: StandardScenario) => {
    const original = (await nationalHoliday({
      id: scenario.nationalHoliday.one.id,
    })) as NationalHoliday
    const result = await updateNationalHoliday({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a nationalHoliday', async (scenario: StandardScenario) => {
    const original = (await deleteNationalHoliday({
      id: scenario.nationalHoliday.one.id,
    })) as NationalHoliday
    const result = await nationalHoliday({ id: original.id })

    expect(result).toEqual(null)
  })
})
