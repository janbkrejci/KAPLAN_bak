import type {
  EditResourceById,
  UpdateResourceInput,
  UpdateResourceMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ResourceForm from 'src/components/Resource/ResourceForm'

export const QUERY: TypedDocumentNode<EditResourceById> = gql`
  query EditResourceById($id: String!) @live {
    resource: resource(id: $id) {
      id
      name
      parentId
      kindId
      createdAt
      updatedAt
    }
  }
`

const UPDATE_RESOURCE_MUTATION: TypedDocumentNode<
  EditResourceById,
  UpdateResourceMutationVariables
> = gql`
  mutation UpdateResourceMutation($id: String!, $input: UpdateResourceInput!) {
    updateResource(id: $id, input: $input) {
      id
      name
      parentId
      kindId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Nahrávám...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ resource }: CellSuccessProps<EditResourceById>) => {
  const [updateResource, { loading, error }] = useMutation(
    UPDATE_RESOURCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Zdroj byl aktualizován')
        navigate(routes.resources())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateResourceInput,
    id: EditResourceById['resource']['id']
  ) => {
    updateResource({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Upravit zdroj {resource?.name}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ResourceForm
          resource={resource}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
