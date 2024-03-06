import type { ResourceLeave } from '@prisma/client'

import {
  resourceLeaves,
  resourceLeave,
  createResourceLeave,
  updateResourceLeave,
  deleteResourceLeave,
} from './resourceLeaves'
import type { StandardScenario } from './resourceLeaves.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('resourceLeaves', () => {
  scenario('returns all resourceLeaves', async (scenario: StandardScenario) => {
    const result = await resourceLeaves()

    expect(result.length).toEqual(Object.keys(scenario.resourceLeave).length)
  })

  scenario(
    'returns a single resourceLeave',
    async (scenario: StandardScenario) => {
      const result = await resourceLeave({ id: scenario.resourceLeave.one.id })

      expect(result).toEqual(scenario.resourceLeave.one)
    }
  )

  scenario('creates a resourceLeave', async (scenario: StandardScenario) => {
    const result = await createResourceLeave({
      input: {
        from: '2024-03-05T15:40:39.934Z',
        to: '2024-03-05T15:40:39.934Z',
        firstDayWorkingHours: 2274330.1613745335,
        lastDayWorkingHours: 734906.9184877499,
        resourceLeaveApprovalStateId: 'String',
        resourceLeaveTypeId: scenario.resourceLeave.two.resourceLeaveTypeId,
        resourceId: scenario.resourceLeave.two.resourceId,
        updatedAt: '2024-03-05T15:40:39.934Z',
      },
    })

    expect(result.from).toEqual(new Date('2024-03-05T15:40:39.934Z'))
    expect(result.to).toEqual(new Date('2024-03-05T15:40:39.934Z'))
    expect(result.firstDayWorkingHours).toEqual(2274330.1613745335)
    expect(result.lastDayWorkingHours).toEqual(734906.9184877499)
    expect(result.resourceLeaveApprovalStateId).toEqual('String')
    expect(result.resourceLeaveTypeId).toEqual(
      scenario.resourceLeave.two.resourceLeaveTypeId
    )
    expect(result.resourceId).toEqual(scenario.resourceLeave.two.resourceId)
    expect(result.updatedAt).toEqual(new Date('2024-03-05T15:40:39.934Z'))
  })

  scenario('updates a resourceLeave', async (scenario: StandardScenario) => {
    const original = (await resourceLeave({
      id: scenario.resourceLeave.one.id,
    })) as ResourceLeave
    const result = await updateResourceLeave({
      id: original.id,
      input: { from: '2024-03-06T15:40:39.934Z' },
    })

    expect(result.from).toEqual(new Date('2024-03-06T15:40:39.934Z'))
  })

  scenario('deletes a resourceLeave', async (scenario: StandardScenario) => {
    const original = (await deleteResourceLeave({
      id: scenario.resourceLeave.one.id,
    })) as ResourceLeave
    const result = await resourceLeave({ id: original.id })

    expect(result).toEqual(null)
  })
})
