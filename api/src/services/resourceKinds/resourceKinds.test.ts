import type { ResourceKind } from '@prisma/client'

import {
  resourceKinds,
  resourceKind,
  createResourceKind,
  updateResourceKind,
  deleteResourceKind,
} from './resourceKinds'
import type { StandardScenario } from './resourceKinds.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('resourceKinds', () => {
  scenario('returns all resourceKinds', async (scenario: StandardScenario) => {
    const result = await resourceKinds()

    expect(result.length).toEqual(Object.keys(scenario.resourceKind).length)
  })

  scenario(
    'returns a single resourceKind',
    async (scenario: StandardScenario) => {
      const result = await resourceKind({ id: scenario.resourceKind.one.id })

      expect(result).toEqual(scenario.resourceKind.one)
    }
  )

  scenario('creates a resourceKind', async () => {
    const result = await createResourceKind({
      input: {
        name: 'String',
        hourlyCost: 2647398.649284718,
        updatedAt: '2024-02-29T10:17:12.268Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.hourlyCost).toEqual(2647398.649284718)
    expect(result.updatedAt).toEqual(new Date('2024-02-29T10:17:12.268Z'))
  })

  scenario('updates a resourceKind', async (scenario: StandardScenario) => {
    const original = (await resourceKind({
      id: scenario.resourceKind.one.id,
    })) as ResourceKind
    const result = await updateResourceKind({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a resourceKind', async (scenario: StandardScenario) => {
    const original = (await deleteResourceKind({
      id: scenario.resourceKind.one.id,
    })) as ResourceKind
    const result = await resourceKind({ id: original.id })

    expect(result).toEqual(null)
  })
})
