import type {
  EditResourceKindById,
  UpdateResourceKindInput,
  UpdateResourceKindMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ResourceKindForm from 'src/components/ResourceKind/ResourceKindForm'

export const QUERY: TypedDocumentNode<EditResourceKindById> = gql`
  query EditResourceKindById($id: String!) @live {
    resourceKind: resourceKind(id: $id) {
      id
      name
      hourlyCost
      createdAt
      updatedAt
    }
  }
`

const UPDATE_RESOURCE_KIND_MUTATION: TypedDocumentNode<
  EditResourceKindById,
  UpdateResourceKindMutationVariables
> = gql`
  mutation UpdateResourceKindMutation(
    $id: String!
    $input: UpdateResourceKindInput!
  ) {
    updateResourceKind(id: $id, input: $input) {
      id
      name
      hourlyCost
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
  resourceKind,
}: CellSuccessProps<EditResourceKindById>) => {
  const [updateResourceKind, { loading, error }] = useMutation(
    UPDATE_RESOURCE_KIND_MUTATION,
    {
      onCompleted: () => {
        toast.success('Typ zdroje byl aktualizován')
        navigate(routes.resourceKinds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateResourceKindInput,
    id: EditResourceKindById['resourceKind']['id']
  ) => {
    updateResourceKind({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Upravit typ zdroje {resourceKind?.name}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ResourceKindForm
          resourceKind={resourceKind}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
