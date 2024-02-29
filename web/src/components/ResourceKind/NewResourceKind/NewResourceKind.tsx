import type {
  CreateResourceKindMutation,
  CreateResourceKindInput,
  CreateResourceKindMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ResourceKindForm from 'src/components/ResourceKind/ResourceKindForm'

const CREATE_RESOURCE_KIND_MUTATION: TypedDocumentNode<
  CreateResourceKindMutation,
  CreateResourceKindMutationVariables
> = gql`
  mutation CreateResourceKindMutation($input: CreateResourceKindInput!) {
    createResourceKind(input: $input) {
      id
    }
  }
`

const NewResourceKind = () => {
  const [createResourceKind, { loading, error }] = useMutation(
    CREATE_RESOURCE_KIND_MUTATION,
    {
      onCompleted: () => {
        toast.success('Typ zdroje byl vytvořen')
        navigate(routes.resourceKinds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateResourceKindInput) => {
    createResourceKind({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Nový typ zdroje</h2>
      </header>
      <div className="rw-segment-main">
        <ResourceKindForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewResourceKind
