import type {
  CreateResourceCapabilityMutation,
  CreateResourceCapabilityInput,
  CreateResourceCapabilityMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ResourceCapabilityForm from 'src/components/ResourceCapability/ResourceCapabilityForm'

const CREATE_RESOURCE_CAPABILITY_MUTATION: TypedDocumentNode<
  CreateResourceCapabilityMutation,
  CreateResourceCapabilityMutationVariables
> = gql`
  mutation CreateResourceCapabilityMutation(
    $input: CreateResourceCapabilityInput!
  ) {
    createResourceCapability(input: $input) {
      id
    }
  }
`

const NewResourceCapability = () => {
  const [createResourceCapability, { loading, error }] = useMutation(
    CREATE_RESOURCE_CAPABILITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('ResourceCapability created')
        navigate(routes.resourceCapabilities())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateResourceCapabilityInput) => {
    createResourceCapability({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Nová kompetence
        </h2>
      </header>
      <div className="rw-segment-main">
        <ResourceCapabilityForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewResourceCapability
