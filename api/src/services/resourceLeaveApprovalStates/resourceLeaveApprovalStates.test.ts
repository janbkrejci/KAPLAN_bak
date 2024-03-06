import type { ResourceLeaveApprovalState } from '@prisma/client'

import {
  resourceLeaveApprovalStates,
  resourceLeaveApprovalState,
  createResourceLeaveApprovalState,
  updateResourceLeaveApprovalState,
  deleteResourceLeaveApprovalState,
} from './resourceLeaveApprovalStates'
import type { StandardScenario } from './resourceLeaveApprovalStates.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('resourceLeaveApprovalStates', () => {
  scenario(
    'returns all resourceLeaveApprovalStates',
    async (scenario: StandardScenario) => {
      const result = await resourceLeaveApprovalStates()

      expect(result.length).toEqual(
        Object.keys(scenario.resourceLeaveApprovalState).length
      )
    }
  )

  scenario(
    'returns a single resourceLeaveApprovalState',
    async (scenario: StandardScenario) => {
      const result = await resourceLeaveApprovalState({
        id: scenario.resourceLeaveApprovalState.one.id,
      })

      expect(result).toEqual(scenario.resourceLeaveApprovalState.one)
    }
  )

  scenario('creates a resourceLeaveApprovalState', async () => {
    const result = await createResourceLeaveApprovalState({
      input: {
        order: 6718375,
        name: 'String9690553',
        updatedAt: '2024-03-05T07:39:16.502Z',
      },
    })

    expect(result.order).toEqual(6718375)
    expect(result.name).toEqual('String9690553')
    expect(result.updatedAt).toEqual(new Date('2024-03-05T07:39:16.502Z'))
  })

  scenario(
    'updates a resourceLeaveApprovalState',
    async (scenario: StandardScenario) => {
      const original = (await resourceLeaveApprovalState({
        id: scenario.resourceLeaveApprovalState.one.id,
      })) as ResourceLeaveApprovalState
      const result = await updateResourceLeaveApprovalState({
        id: original.id,
        input: { order: 3484263 },
      })

      expect(result.order).toEqual(3484263)
    }
  )

  scenario(
    'deletes a resourceLeaveApprovalState',
    async (scenario: StandardScenario) => {
      const original = (await deleteResourceLeaveApprovalState({
        id: scenario.resourceLeaveApprovalState.one.id,
      })) as ResourceLeaveApprovalState
      const result = await resourceLeaveApprovalState({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
