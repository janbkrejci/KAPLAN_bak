import type {
  EditResourceCapabilityById,
  UpdateResourceCapabilityInput,
  UpdateResourceCapabilityMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ResourceCapabilityForm from 'src/components/ResourceCapability/ResourceCapabilityForm'

export const QUERY: TypedDocumentNode<EditResourceCapabilityById> = gql`
  query EditResourceCapabilityById($id: String!) @live {
    resourceCapability: resourceCapability(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

const UPDATE_RESOURCE_CAPABILITY_MUTATION: TypedDocumentNode<
  EditResourceCapabilityById,
  UpdateResourceCapabilityMutationVariables
> = gql`
  mutation UpdateResourceCapabilityMutation(
    $id: String!
    $input: UpdateResourceCapabilityInput!
  ) {
    updateResourceCapability(id: $id, input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Nahrávám...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  resourceCapability,
}: CellSuccessProps<EditResourceCapabilityById>) => {
  const [updateResourceCapability, { loading, error }] = useMutation(
    UPDATE_RESOURCE_CAPABILITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Kompetence byla aktualizována')
        navigate(routes.resourceCapabilities())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateResourceCapabilityInput,
    id: EditResourceCapabilityById['resourceCapability']['id']
  ) => {
    updateResourceCapability({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Upravit kompetenci {resourceCapability?.name}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ResourceCapabilityForm
          resourceCapability={resourceCapability}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
