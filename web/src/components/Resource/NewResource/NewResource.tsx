import type {
  CreateResourceMutation,
  CreateResourceInput,
  CreateResourceMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ResourceForm from 'src/components/Resource/ResourceForm'

const CREATE_RESOURCE_MUTATION: TypedDocumentNode<
  CreateResourceMutation,
  CreateResourceMutationVariables
> = gql`
  mutation CreateResourceMutation($input: CreateResourceInput!) {
    createResource(input: $input) {
      id
    }
  }
`

const NewResource = () => {
  const [createResource, { loading, error }] = useMutation(
    CREATE_RESOURCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Zdroj byl vytvořen')
        navigate(routes.resources())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateResourceInput) => {
    createResource({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Nový zdroj</h2>
      </header>
      <div className="rw-segment-main">
        <ResourceForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewResource
