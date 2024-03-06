import type { ResourceLeaveType } from '@prisma/client'

import {
  resourceLeaveTypes,
  resourceLeaveType,
  createResourceLeaveType,
  updateResourceLeaveType,
  deleteResourceLeaveType,
} from './resourceLeaveTypes'
import type { StandardScenario } from './resourceLeaveTypes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('resourceLeaveTypes', () => {
  scenario(
    'returns all resourceLeaveTypes',
    async (scenario: StandardScenario) => {
      const result = await resourceLeaveTypes()

      expect(result.length).toEqual(
        Object.keys(scenario.resourceLeaveType).length
      )
    }
  )

  scenario(
    'returns a single resourceLeaveType',
    async (scenario: StandardScenario) => {
      const result = await resourceLeaveType({
        id: scenario.resourceLeaveType.one.id,
      })

      expect(result).toEqual(scenario.resourceLeaveType.one)
    }
  )

  scenario('creates a resourceLeaveType', async () => {
    const result = await createResourceLeaveType({
      input: { name: 'String2220563', updatedAt: '2024-03-05T15:40:42.328Z' },
    })

    expect(result.name).toEqual('String2220563')
    expect(result.updatedAt).toEqual(new Date('2024-03-05T15:40:42.328Z'))
  })

  scenario(
    'updates a resourceLeaveType',
    async (scenario: StandardScenario) => {
      const original = (await resourceLeaveType({
        id: scenario.resourceLeaveType.one.id,
      })) as ResourceLeaveType
      const result = await updateResourceLeaveType({
        id: original.id,
        input: { name: 'String14919882' },
      })

      expect(result.name).toEqual('String14919882')
    }
  )

  scenario(
    'deletes a resourceLeaveType',
    async (scenario: StandardScenario) => {
      const original = (await deleteResourceLeaveType({
        id: scenario.resourceLeaveType.one.id,
      })) as ResourceLeaveType
      const result = await resourceLeaveType({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
